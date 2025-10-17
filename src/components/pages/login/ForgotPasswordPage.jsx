"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowLeft, AlertCircle, Loader, CheckCircle } from "lucide-react"
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore"

export default function ForgotPasswordPage({ onCancel, onBackToLogin }) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const db = getFirestore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validar email
      if (!email.trim()) {
        setError("Por favor, digite um email válido")
        setLoading(false)
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setError("Email inválido")
        setLoading(false)
        return
      }

      // Verificar se o usuário existe
      const usersRef = collection(db, "users")
      const q = query(usersRef, where("email", "==", email.toLowerCase()))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        // Por segurança, mostrar mensagem genérica mesmo se não encontrar
        setSubmitted(true)
        setLoading(false)
        return
      }

      const userData = querySnapshot.docs[0].data()
      const userId = querySnapshot.docs[0].id

      // Gerar token de verificação
      const verificationToken = Math.random().toString(36).substring(2, 15) + 
                                Math.random().toString(36).substring(2, 15)

      // Salvar solicitação de recuperação de senha no Firestore
      try {
        // Tentar salvar na subcoleção do usuário (mais seguro)
        await addDoc(collection(db, "users", userId, "passwordResetRequests"), {
          email: email.toLowerCase(),
          verificationToken: verificationToken,
          status: "aguardando_verificacao",
          createdAt: serverTimestamp(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
          verified: false,
          verifiedAt: null,
          resetAt: null
        })
      } catch (subCollectionError) {
        // Se falhar, tentar coleção pública (fallback)
        console.warn("Erro ao salvar em subcoleção, usando fallback:", subCollectionError)
        await addDoc(collection(db, "passwordResetRequests"), {
          email: email.toLowerCase(),
          userId: userId,
          userRole: userData.role || userData.userRole,
          verificationToken: verificationToken,
          status: "aguardando_verificacao",
          createdAt: serverTimestamp(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          verified: false,
          verifiedAt: null,
          resetAt: null
        })
      }

      setSubmitted(true)
      setLoading(false)
    } catch (err) {
      console.error("Erro ao enviar solicitação:", err)
      setError("Erro ao processar solicitação. Tente novamente mais tarde.")
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-gray-200 dark:border-gray-700"
        >
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <CheckCircle size={56} className="text-green-500" />
            </motion.div>
            
            <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
              Solicitação Enviada!
            </h2>
            
            <p className="dark:text-gray-400 text-gray-600 mb-6 text-sm leading-relaxed">
              Sua solicitação de recuperação de senha foi enviada para a secretaria. Você receberá uma resposta em breve via email.
            </p>

            <div className="space-y-2.5">
              <button
                onClick={onBackToLogin}
                className="w-full px-4 py-2.5 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-lg font-medium transition-colors text-sm"
              >
                Voltar ao Login
              </button>
              
              <button
                onClick={() => setSubmitted(false)}
                className="w-full px-4 py-2.5 dark:bg-[#2D2D2D] bg-gray-100 dark:text-white text-gray-800 rounded-lg font-medium transition-colors hover:bg-gray-200 dark:hover:bg-[#3D3D3D] text-sm"
              >
                Nova Solicitação
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
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
          {/* Descrição */}
          <p className="dark:text-gray-400 text-gray-600 text-xs leading-relaxed">
            Digite o email associado à sua conta. Enviaremos um link de verificação seguro.
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-2 items-start"
            >
              <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-700 dark:text-red-300">{error}</p>
            </motion.div>
          )}

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
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-3 py-2.5 bg-gradient-to-r from-[#8C43FF] to-[#CCA9DD] hover:from-[#9955FF] hover:to-[#D9B8E8] disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Mail size={16} />
                  Enviar Email
                </>
              )}
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
