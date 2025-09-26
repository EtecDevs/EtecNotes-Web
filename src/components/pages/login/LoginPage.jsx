"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, GraduationCap, Users, Building2, Calendar } from "lucide-react"
import { useAuth } from "../../../hooks/useAuth"

export default function LoginPage({ onLogin, onCancel }) {
  const { login, loading, isAuthenticated } = useAuth()
  const [userType, setUserType] = useState("aluno")
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [formData, setFormData] = useState({
    codigoEtec: "",
    rm: "",
    email: "",
    senha: "",
  })

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (isAuthenticated && onLogin) {
      onLogin()
    }
  }, [isAuthenticated, onLogin])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoginError("")
    
    if (!formData.email || !formData.senha) {
      setLoginError("Por favor, preencha email e senha.")
      return
    }

    try {
      const result = await login(formData.email, formData.senha)
      
      if (result.success) {
        console.log("Login realizado com sucesso:", result.user)
        // Chama o callback do App para mudar de tela
        if (typeof onLogin === "function") {
          onLogin()
        }
      } else {
        setLoginError(result.error || "Erro ao fazer login")
      }
    } catch (error) {
      console.error("Erro no login:", error)
      setLoginError("Erro inesperado. Tente novamente.")
    }
  }

  const userTypes = [
    { id: "aluno", label: "Aluno", icon: GraduationCap },
    { id: "professor", label: "Professor", icon: Users },
    { id: "etec", label: "Etec", icon: Building2 },
  ]

  return (
    <div className="relative isolate min-h-dvh flex items-center justify-center p-4">
      {/* Fixed full-viewport gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8c43ff] via-[#a76fff] to-[#553b7d]" />
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
      </div>

  <div className="fixed z-10 w-full max-w-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg"></h1>
          <p className="text-white">Acesse sua conta</p>
        </div>

        <Card className="bg-gray-800/90 backdrop-blur-xl border-gray-600 shadow-2xl">
          <CardContent className="p-6">
            {/* User Type Tabs */}
            <div className="flex bg-gray-700/50 rounded-xl overflow-hidden h-12 mb-6">
              {userTypes.map((type, idx) => {
                const Icon = type.icon
                const isActive = userType === type.id
                const isFirst = idx === 0
                const isLast = idx === userTypes.length - 1
                return (
                  <button
                    key={type.id}
                    onClick={() => setUserType(type.id)}
                    className={[
                      "flex-1 h-full flex items-center justify-center gap-2 px-4 transition-all duration-300",
                      isActive ? "bg-purple-500 text-white shadow-lg" : "text-white hover:text-white hover:bg-gray-600/50",
                      isActive && isFirst ? "rounded-l-xl" : "",
                      isActive && isLast ? "rounded-r-xl" : "",
                    ].join(" ")}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
                <p className="text-red-400 text-sm">{loginError}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-gray-700/50 border-gray-500 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400/20"
                  placeholder="seu-email@etec.sp.gov.br"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="senha" className="text-white font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="senha"
                    type={showPassword ? "text" : "password"}
                    value={formData.senha}
                    onChange={(e) => handleInputChange("senha", e.target.value)}
                    className="bg-gray-700/50 border-gray-500 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400/20 pr-10"
                    placeholder="Digite sua senha"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-2">
              <button className="text-white hover:text-purple-300 text-sm transition-colors block w-full">
                Esqueceu sua senha?
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white text-sm">Sistema de Gestão Educacional ETEC</p>
        </div>
      </div>
    </div>
  )
}
