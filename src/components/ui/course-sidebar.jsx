"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function CourseSidebar({ courses, selectedCourse, onSelectCourse, currentUser, currentProfile }) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <div className="w-64 border-r bg-muted/30 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">EtecNotes</h1>
        <p className="text-xs text-muted-foreground">Fórum Estudantil</p>
      </div>

      {/* Courses List */}
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {courses.map((course) => (
            <Button
              key={course.id}
              variant={selectedCourse?.id === course.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 h-auto py-3"
              onClick={() => onSelectCourse(course)}
            >
              <span className="text-xl">{course.icon}</span>
              <div className="flex-1 text-left">
                <div className="font-medium text-sm">{course.name}</div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* User Profile Footer */}
      <div className="p-3 border-t bg-background/50">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentProfile?.avatar_url || undefined} />
            <AvatarFallback>{currentProfile?.display_name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{currentProfile?.display_name || "Usuário"}</p>
            <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
