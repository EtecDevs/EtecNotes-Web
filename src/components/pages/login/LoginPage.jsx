"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, GraduationCap, Users, Building2, Calendar, AlertCircle, Shield } from "lucide-react"
import { useAuth } from "../../../hooks/useAuth"
import ForgotPasswordPage from "./ForgotPasswordPage"

export default function LoginPage({ onLogin, onCancel }) {
  const { login, loading } = useAuth()
  const [localLoading, setLocalLoading] = useState(false)
  const [userType, setUserType] = useState("aluno")
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [errorMessage, setErrorMessage] = useState('')
  const [suggestionMessage, setSuggestionMessage] = useState('')
  const [errorCode, setErrorCode] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [formData, setFormData] = useState({
    codigoEtec: "",
    rm: "",
    email: "",
    senha: "",
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalLoading(true);
    
    // Limpar mensagens anteriores
    console.log('🔄 Iniciando login, limpando mensagens...');
    setLoginError("");
    setErrorMessage('');
    setSuggestionMessage('');
    setErrorCode('');

    if (!formData.email || (!formData.senha && userType !== "administrador")) {
      setErrorMessage("Por favor, preencha o email e a senha corretamente.");
      setSuggestionMessage("Todos os campos são obrigatórios para o login.");
      setLocalLoading(false);
      return;
    }
    if (userType === "aluno" && !formData.rm) {
      setErrorMessage("Por favor, preencha o RM corretamente.");
      setSuggestionMessage("O RM é necessário para o login de alunos.");
      setLocalLoading(false);
      return;
    }

    try {
      const roleMapping = {
        'aluno': 'aluno',
        'professor': 'professor',
        'etec': 'SECRETARIA',
        'administrador': 'ADMINISTRADOR'
      };
      
      const result = await login(
        formData.email.trim(),
        formData.senha,
        roleMapping[userType] || userType,
        userType === "aluno" ? formData.rm : null
      );
      if (result.success && typeof onLogin === "function") {
        onLogin();
      } else if (!result.success) {
        // Exibir mensagens detalhadas do backend
        console.log('📋 ERRO CAPTURADO - Dados do backend:', {
          fullResult: result,
          error: result.error,
          suggestion: result.suggestion,
          code: result.code,
          userRole: result.userRole,
          attemptedRole: result.attemptedRole
        });
        
        const errorMsg = result.error || "Ocorreu um erro desconhecido ao tentar logar.";
        const suggestionMsg = result.suggestion || "Tente novamente ou contate o suporte.";
        const codeMsg = result.code || '';
        
        console.log('🎨 DEFININDO STATES:', {
          errorMessage: errorMsg,
          suggestionMessage: suggestionMsg,
          errorCode: codeMsg
        });
        
        setErrorMessage(errorMsg);
        setSuggestionMessage(suggestionMsg);
        setErrorCode(codeMsg);
        setLoginError(errorMsg);
        
        // Forçar re-render
        setTimeout(() => {
          console.log('🔍 VERIFICANDO STATES APÓS SET:', {
            errorMessage: errorMsg,
            suggestionMessage: suggestionMsg,
            errorCode: codeMsg
          });
        }, 100);
      }
    } catch (error) {
      console.error('❌ ERRO INESPERADO capturado:', {
        message: error.message,
        suggestion: error.suggestion,
        fullError: error
      });
      
      const errorMsg = error.message || "Ocorreu um erro inesperado ao tentar logar.";
      const suggestionMsg = error.suggestion || "Tente novamente ou contate o suporte.";
      
      setErrorMessage(errorMsg);
      setSuggestionMessage(suggestionMsg);
      setLoginError(errorMsg);
    } finally {
      setLocalLoading(false);
    }
  }

  const userTypes = [
    { id: "aluno", label: "Aluno", icon: GraduationCap, message: "Aluno" },
    { id: "professor", label: "Professor", icon: Users, message: "Professor" },
    { id: "etec", label: "Secretaria", icon: Building2, message: "Secretaria" },
    { id: "administrador", icon: Shield, message: "Administrador" },
  ]

  // Obter informações do tipo de usuário selecionado
  const getCurrentUserType = () => {
    return userTypes.find(type => type.id === userType) || userTypes[0]
  }

  const currentType = getCurrentUserType()
  const CurrentIcon = currentType.icon

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
        {/* Header Dinâmico com Animação - COMPACTADO */}
        <div className="text-center mb-5">
          {/* Ícone Animado que muda com o tipo de usuário - MENOR */}
          <div 
            key={userType} 
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-3xl mb-3 shadow-2xl shadow-purple-500/50 animate-bounce-in relative overflow-hidden"
          >
            {/* Efeito de brilho */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 animate-shine" />
            <CurrentIcon className="w-8 h-8 text-white relative z-10 animate-icon-pop" />
          </div>
          
          {/* Mensagem Dinâmica com Animação - MENOR */}
          <div className="overflow-hidden">
            <h1 
              key={`title-${userType}`}
              className="text-2xl font-bold text-white mb-1 drop-shadow-lg animate-slide-down"
            >
              Entre como {currentType.message}!
            </h1>
          </div>
          
          <p className="text-white/90 text-xs font-medium animate-fade-in">
            Acesse sua conta para continuar
          </p>
        </div>

        {/* CSS para animações */}
        <style jsx>{`
          @keyframes bounce-in {
            0% {
              transform: scale(0) rotate(-180deg);
              opacity: 0;
            }
            50% {
              transform: scale(1.1) rotate(10deg);
            }
            100% {
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
          }

          @keyframes icon-pop {
            0% {
              transform: scale(0.8);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }

          @keyframes slide-down {
            from {
              transform: translateY(-20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes shine {
            0% {
              transform: translateX(-100%) translateY(-100%) rotate(45deg);
            }
            100% {
              transform: translateX(100%) translateY(100%) rotate(45deg);
            }
          }

          .animate-bounce-in {
            animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }

          .animate-icon-pop {
            animation: icon-pop 0.4s ease-out 0.2s;
          }

          .animate-slide-down {
            animation: slide-down 0.5s ease-out;
          }

          .animate-fade-in {
            animation: fade-in 0.6s ease-out 0.3s both;
          }

          .animate-shine {
            animation: shine 2s ease-in-out infinite;
          }
        `}</style>

        <Card className="bg-gray-800/90 backdrop-blur-xl border-gray-600 shadow-2xl">
          <CardContent className="p-4">
            {/* User Type Tabs - COMPACTADO */}
            <div className="flex bg-gray-700/50 rounded-xl overflow-hidden h-10 mb-4">
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

            {/* Error Messages */}
            {(errorMessage || suggestionMessage) && (
              <div className="relative mb-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-red-400/5 to-orange-500/10 backdrop-blur-sm"></div>
                
                <div className="relative border border-red-500/30 rounded-xl p-4 bg-gray-800/40">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                      </div>
                      <h4 className="text-red-400 font-semibold text-sm">
                        Erro de Acesso
                      </h4>
                      {errorCode && (
                        <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full border border-red-500/30 font-mono">
                          {errorCode}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setErrorMessage('');
                        setSuggestionMessage('');
                        setErrorCode('');
                        setLoginError('');
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors p-1 hover:bg-red-500/20 rounded-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {errorMessage && (
                    <div className="mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-1 bg-red-500 rounded-full flex-shrink-0 self-stretch"></div>
                        <div className="flex-1">
                          <p className="text-red-200 text-sm leading-relaxed font-medium">
                            {errorMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {suggestionMessage && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-blue-300 font-medium text-xs mb-1">💡 Como resolver:</p>
                          <p className="text-blue-200 text-xs leading-relaxed">
                            {suggestionMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}




            {/* Login Form - ESPAÇAMENTO REDUZIDO */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email Field */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-white font-medium text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-gray-700/50 border-gray-500 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400/20"
                  placeholder="Digite seu Email"
                  required
                />
              </div>

              {/* RM Field (only for aluno) */}
              {userType === "aluno" && (
                <div className="space-y-1.5">
                  <Label htmlFor="rm" className="text-white font-medium text-sm">
                    RM
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
              )}  

              {/* Password Field */}
              <div className="space-y-1.5">
                <Label htmlFor="senha" className="text-white font-medium text-sm">
                  {userType === "administrador" ? "Senha (opcional)" : "Senha"}
                </Label>
                <div className="relative">
                  <Input
                    id="senha"
                    type={showPassword ? "text" : "password"}
                    value={formData.senha}
                    onChange={(e) => handleInputChange("senha", e.target.value)}
                    className="bg-gray-700/50 border-gray-500 text-white placeholder:text-gray-300 focus:border-purple-400 focus:ring-purple-400/20 pr-10"
                    placeholder={userType === "administrador" ? "Deixe em branco para acesso direto" : "Digite sua Senha"}
                    required={userType !== "administrador"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {userType === "administrador" && (
                  <p className="text-xs text-purple-300">
                    ℹ️ Administradores podem entrar apenas com o email
                  </p>
                )}
              </div>

              {/* Submit Button - COMPACTADO */}
              <Button
                type="submit"
                disabled={localLoading || loading}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
              >
                {(localLoading || loading) ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            {/* Footer Links - COMPACTADO */}
            <div className="mt-4 text-center space-y-1">
              <button 
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-white hover:text-purple-300 text-xs transition-colors block w-full"
              >
                Esqueceu sua senha?
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="text-gray-300 hover:text-white text-xs px-3 py-0.5 rounded transition-colors bg-transparent border-none"
                style={{textDecoration: 'underline', opacity: 0.8}}
              >
                Voltar ao início
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer - COMPACTADO */}
        <div className="text-center mt-4">
          <p className="text-white text-xs">Sistema de Gestão Educacional ETEC</p>
        </div>
      </div>

      {/* Backdrop para modal de recuperação de senha */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowForgotPassword(false)} />
      )}

      {/* Modal de recuperação de senha */}
      {showForgotPassword && (
        <ForgotPasswordPage 
          onCancel={() => setShowForgotPassword(false)}
          onBackToLogin={() => setShowForgotPassword(false)}
        />
      )}
    </div>
  )
}
