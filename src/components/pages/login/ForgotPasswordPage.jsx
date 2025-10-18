"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, Info } from "lucide-react"

export default function ForgotPasswordPage({ onCancel, onBackToLogin }) {
  const [email, setEmail] = useState("")
  const [showTooltip, setShowTooltip] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder: lógica será implementada no backend
    console.log("Recuperação de senha solicitada para:", email)
    // Por enquanto, apenas fecha o modal
    onBackToLogin()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl max-w-sm w-full border border-gray-200 dark:border-gray-700"
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-6 pt-5 pb-3 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={onBackToLogin}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2D2D2D] transition-colors flex-shrink-0"
            title="Voltar"
          >
            <ArrowLeft size={20} className="text-[#8C43FF]" />
          </button>
          <h1 className="text-xl font-bold dark:text-white text-gray-900">
            Recuperar Senha
          </h1>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-4">
          {/* Descrição com Ícone de Informação */}
          <div className="flex items-start gap-2">
            <p className="dark:text-gray-400 text-gray-600 text-xs leading-relaxed flex-1">
              Digite o email associado à sua conta. Enviaremos um link de verificação seguro.
            </p>
            
            {/* Ícone de Informação com Tooltip */}
            <div className="relative flex-shrink-0">
              <button
                type="button"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
                className="w-5 h-5 rounded-full bg-[#8C43FF] hover:bg-[#9955FF] text-white flex items-center justify-center transition-colors"
              >
                <Info size={14} />
              </button>

              {/* Tooltip */}
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg p-3 shadow-xl z-50 border border-gray-700"
                >
                  {/* Seta apontando para o ícone */}
                  <div className="absolute -top-1 right-2 w-2 h-2 bg-gray-900 dark:bg-gray-800 transform rotate-45 border-t border-l border-gray-700" />
                  
                  <p className="leading-relaxed">
                    <strong>Como funciona:</strong>
                  </p>
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Você recebe um email com um link de confirmação</li>
                    <li>Clique no link para confirmar sua identidade</li>
                    <li>Você será redirecionado para uma página segura</li>
                    <li>Crie uma nova senha e pronto! 🔐</li>
                  </ol>
                </motion.div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium dark:text-gray-300 text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="w-full px-3 py-2 rounded-lg dark:bg-[#2D2D2D] bg-gray-50 dark:text-white text-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8C43FF] placeholder-gray-400 dark:placeholder-gray-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full px-3 py-2.5 bg-gradient-to-r from-[#8C43FF] to-[#CCA9DD] hover:from-[#9955FF] hover:to-[#D9B8E8] text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm"
            >
              <Mail size={16} />
              Enviar Email
            </button>
          </form>
        </div>

        <div className="px-6 py-3.5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#141414] rounded-b-2xl">
          <p className="text-xs dark:text-gray-400 text-gray-600 text-center">
            💡 Verifique sua pasta de spam se não receber o email
          </p>
        </div>
      </motion.div>
    </div>
  )
}
