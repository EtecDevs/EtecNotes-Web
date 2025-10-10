import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ForumLayout } from "@/components/forum/forum-layout"

export default async function ForumPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch courses
  const { data: courses } = await supabase.from("courses").select("*").order("name")

  return <ForumLayout user={user} profile={profile} courses={courses || []} />
}
