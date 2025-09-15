"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, GraduationCap, Users, Building2, Calendar } from "lucide-react"

export default function LoginPage({ onLogin, onCancel }) {
  const [userType, setUserType] = useState("aluno")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    codigoEtec: "",
    rm: "",
    login: "",
    senha: "",
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempt:", { userType, ...formData })
    // If parent provided an onLogin handler (App), call it to switch to Início
    if (typeof onLogin === "function") {
      onLogin()
    } else {
      // Fallback: navigate to root
      window.location.href = "/"
    }
  }

  const userTypes = [
    { id: "aluno", label: "Aluno", icon: GraduationCap },
    { id: "professor", label: "Professor", icon: Users },
    { id: "etec", label: "Etec", icon: Building2 },
  ]

  return (
    <div
      className="min-h-screen bg-gray-900 flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)" }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Sistema ETEC</h1>
          <p className="text-white">Acesse sua conta</p>
        </div>

        <Card className="bg-gray-800/90 backdrop-blur-xl border-gray-600 shadow-2xl">
          <CardContent className="p-6">
            {/* User Type Tabs */}
            <div className="flex bg-gray-700/50 rounded-xl p-1 mb-6">
              {userTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => setUserType(type.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                      userType === type.id
                        ? "bg-purple-500 text-white shadow-lg"
                        : "text-white hover:text-white hover:bg-gray-600/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Código ETEC - Always shown */}
              <div className="space-y-2">
                <Label htmlFor="codigoEtec" className="text-white font-medium">
                  Código ETEC
                </Label>
                <Input
                  id="codigoEtec"
                  type="text"
                  value={formData.codigoEtec}
                  onChange={(e) => handleInputChange("codigoEtec", e.target.value)}
                  className="bg-gray-700/50 border-gray-500 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400/20"
                  placeholder="Digite o código da ETEC"
                  required
                />
              </div>

              {/* Conditional Fields */}
              {userType === "aluno" ? (
                <div className="space-y-2">
                  <Label htmlFor="rm" className="text-white font-medium">
                    RM (Registro do Aluno)
                  </Label>
                  <Input
                    id="rm"
                    type="text"
                    value={formData.rm}
                    onChange={(e) => handleInputChange("rm", e.target.value)}
                    className="bg-gray-700/50 border-gray-500 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400/20"
                    placeholder="Digite seu RM"
                    required
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="login" className="text-white font-medium">
                    Login
                  </Label>
                  <Input
                    id="login"
                    type="text"
                    value={formData.login}
                    onChange={(e) => handleInputChange("login", e.target.value)}
                    className="bg-gray-700/50 border-gray-500 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400/20"
                    placeholder="Digite seu login"
                    required
                  />
                </div>
              )}

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
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                Entrar
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
