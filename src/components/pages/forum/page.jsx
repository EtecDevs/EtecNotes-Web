import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/forum")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-background to-muted">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-6xl font-bold text-balance">EtecNotes</h1>
        <p className="text-xl text-muted-foreground text-balance">
          Fórum estudantil para troca de experiências entre alunos das Etecs
        </p>
        <p className="text-muted-foreground">
          Conecte-se com estudantes de diferentes cursos, tire dúvidas e compartilhe conhecimento em tempo real.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Button asChild size="lg">
            <Link href="/auth/sign-up">Criar conta</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/login">Entrar</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
