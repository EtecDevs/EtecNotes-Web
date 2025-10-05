"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, GraduationCap, Users, Building2, Calendar, AlertCircle } from "lucide-react"
import { useAuth } from "../../../hooks/useAuth"

export default function LoginPage({ onLogin, onCancel }) {
  const { login, loading } = useAuth()
  const [localLoading, setLocalLoading] = useState(false)
  const [userType, setUserType] = useState("aluno")
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [errorMessage, setErrorMessage] = useState('')
  const [suggestionMessage, setSuggestionMessage] = useState('')
  const [errorCode, setErrorCode] = useState('')
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

    if (!formData.email || !formData.senha) {
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
      const result = await login(
        formData.email.trim(),
        formData.senha,
        userType === "etec" ? "ADM" : userType,
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

            {/* Error Messages - Card integrado ao design do login */}
            {(() => {
              console.log('🔍 RENDER - Estados atuais:', { errorMessage, suggestionMessage, loginError });
              return (errorMessage || suggestionMessage) ? true : false;
            })() && (
              <div className="relative mb-4 overflow-hidden">
                {/* Background com gradiente e blur */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-red-400/5 to-orange-500/10 backdrop-blur-sm"></div>
                
                <div className="relative border border-red-500/30 rounded-xl p-4 bg-gray-800/40">
                  {/* Header do erro */}
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
                  
                  {/* Mensagem principal do erro */}
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
                  
                  {/* Sugestão de solução */}
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
            
            {/* Debug: Forçar exibição se houver erro */}
            {(errorMessage || loginError) && (
              <div className="text-xs text-white/50 mt-2 p-2 bg-black/20 rounded">
                DEBUG: errorMessage={errorMessage} | loginError={loginError}
              </div>
            )}
            
            {/* Botão de teste temporário */}
            <button
              type="button"
              onClick={() => {
                console.log('🧪 TESTANDO exibição de erro...');
                setErrorMessage('Você está registrado como ALUNO, mas está tentando acessar a área de PROFESSORES');
                setSuggestionMessage('Use a área de login dos ALUNOS ou verifique se suas credenciais estão corretas.');
                setErrorCode('ROLE_MISMATCH');
              }}
              className="w-full mb-2 px-3 py-2 bg-yellow-600/20 text-yellow-300 text-xs rounded-lg border border-yellow-600/30"
            >
              🧪 Testar Mensagem de Erro
            </button>




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

              {/* RM Field (only for aluno) */}
              {userType === "aluno" && (
                <div className="space-y-2">
                  <Label htmlFor="rm" className="text-white font-medium">
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
                disabled={localLoading || loading}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {(localLoading || loading) ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-2">
              <button className="text-white hover:text-purple-300 text-sm transition-colors block w-full">
                Esqueceu sua senha?
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="mt-2 text-gray-300 hover:text-white text-xs px-3 py-1 rounded transition-colors bg-transparent border-none"
                style={{textDecoration: 'underline', opacity: 0.8}}
              >
                Voltar ao início
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
