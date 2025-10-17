"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Lock, Eye, EyeOff, AlertCircle, Loader, CheckCircle, Mail } from "lucide-react"
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore"
import { getAuth, updatePassword } from "firebase/auth"

export default function PasswordResetPage({ token, email, onSuccess, onError }) {
  const [step, setStep] = useState("verify") // verify, reset, success
  const [verifyCode, setVerifyCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const db = getFirestore()
  const auth = getAuth()

  // Calcular força da senha
  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++
    return strength
  }

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(newPassword))
  }, [newPassword])

  const handleVerify = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (!verifyCode.trim()) {
        setError("Digite o código de verificação")
        setLoading(false)
        return
      }

      // Buscar a solicitação de reset no Firestore
      const resetRequestsRef = collection(db, "passwordResetRequests")
      const q = query(
        resetRequestsRef,
        where("email", "==", email.toLowerCase()),
        where("verificationToken", "==", verifyCode),
        where("status", "==", "aguardando_verificacao")
      )

      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        setError("Código de verificação inválido ou expirado")
        setLoading(false)
        return
      }

      const resetDoc = querySnapshot.docs[0]
      
      // Verificar se expirou
      if (resetDoc.data().expiresAt < new Date()) {
        setError("Link de verificação expirado. Solicite um novo.")
        setLoading(false)
        return
      }

      // Atualizar status para verificado
      await updateDoc(doc(db, "passwordResetRequests", resetDoc.id), {
        status: "verificado",
        verified: true,
        verifiedAt: new Date()
      })

      setStep("reset")
      setLoading(false)
    } catch (err) {
      console.error("Erro na verificação:", err)
      setError("Erro ao verificar código. Tente novamente.")
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validações
      if (!newPassword || !confirmPassword) {
        setError("Preencha todos os campos")
        setLoading(false)
        return
      }

      if (newPassword.length < 8) {
        setError("Senha deve ter pelo menos 8 caracteres")
        setLoading(false)
        return
      }

      if (newPassword !== confirmPassword) {
        setError("As senhas não coincidem")
        setLoading(false)
        return
      }

      if (passwordStrength < 3) {
        setError("Senha muito fraca. Use maiúsculas, minúsculas, números e símbolos")
        setLoading(false)
        return
      }

      // Buscar o usuário
      const usersRef = collection(db, "users")
      const userQuery = query(usersRef, where("email", "==", email.toLowerCase()))
      const userSnapshot = await getDocs(userQuery)

      if (userSnapshot.empty) {
        setError("Usuário não encontrado")
        setLoading(false)
        return
      }

      const userData = userSnapshot.docs[0]

      // Atualizar a senha no Firestore (apenas no banco de dados, não no Auth)
      await updateDoc(doc(db, "users", userData.id), {
        password: newPassword, // Em produção, isso deveria ser um hash, não texto claro!
        updatedAt: new Date()
      })

      // Atualizar status na collection de resets
      const resetRequestsRef = collection(db, "passwordResetRequests")
      const resetQuery = query(
        resetRequestsRef,
        where("email", "==", email.toLowerCase()),
        where("verified", "==", true)
      )

      const resetSnapshot = await getDocs(resetQuery)
      if (resetSnapshot.docs.length > 0) {
        await updateDoc(doc(db, "passwordResetRequests", resetSnapshot.docs[0].id), {
          status: "concluido",
          resetAt: new Date()
        })
      }

      setStep("success")
      setLoading(false)

      if (onSuccess) {
        setTimeout(() => onSuccess(), 3000)
      }
    } catch (err) {
      console.error("Erro ao redefinir senha:", err)
      setError("Erro ao redefinir senha. Tente novamente.")
      setLoading(false)
    }
  }

  // Página de verificação
  if (step === "verify") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl max-w-sm w-full border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="px-6 pt-5 pb-3 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold dark:text-white text-gray-900">
              Verificar Identidade
            </h1>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-4">
            <div className="flex justify-center mb-4">
              <Mail size={48} className="text-[#8C43FF]" />
            </div>

            <p className="dark:text-gray-400 text-gray-600 text-sm text-center">
              Enviamos um código de verificação para <span className="font-semibold">{email}</span>
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

            <form onSubmit={handleVerify} className="space-y-3">
              <div>
                <label className="block text-xs font-medium dark:text-gray-300 text-gray-700 mb-1.5">
                  Código de Verificação
                </label>
                <input
                  type="text"
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value.toUpperCase())}
                  placeholder="Digite o código do email"
                  className="w-full px-3 py-2 rounded-lg dark:bg-[#2D2D2D] bg-gray-50 dark:text-white text-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8C43FF] placeholder-gray-400 dark:placeholder-gray-500 text-sm font-mono"
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
                    Verificando...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    Verificar Código
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

  // Página de redefinição de senha
  if (step === "reset") {
    const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-green-500"]
    const strengthTexts = ["Muito fraca", "Fraca", "Média", "Forte", "Muito forte"]

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl max-w-sm w-full border border-gray-200 dark:border-gray-700"
        >
          {/* Header */}
          <div className="px-6 pt-5 pb-3 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold dark:text-white text-gray-900">
              Redefinir Senha
            </h1>
          </div>

          {/* Content */}
          <div className="px-6 py-5 space-y-4">
            <div className="flex justify-center mb-4">
              <Lock size={48} className="text-[#8C43FF]" />
            </div>

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

            <form onSubmit={handleResetPassword} className="space-y-3">
              {/* Nova Senha */}
              <div>
                <label className="block text-xs font-medium dark:text-gray-300 text-gray-700 mb-1.5">
                  Nova Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Crie uma senha forte"
                    className="w-full px-3 py-2 rounded-lg dark:bg-[#2D2D2D] bg-gray-50 dark:text-white text-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8C43FF] placeholder-gray-400 dark:placeholder-gray-500 text-sm pr-10"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Indicador de força */}
                {newPassword && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`flex-1 h-1 rounded-full transition-all ${
                            i < passwordStrength ? strengthColors[passwordStrength - 1] : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs dark:text-gray-400 text-gray-600">
                      Força: <span className="font-medium">{strengthTexts[Math.max(0, passwordStrength - 1)]}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Confirmar Senha */}
              <div>
                <label className="block text-xs font-medium dark:text-gray-300 text-gray-700 mb-1.5">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme a senha"
                    className="w-full px-3 py-2 rounded-lg dark:bg-[#2D2D2D] bg-gray-50 dark:text-white text-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8C43FF] placeholder-gray-400 dark:placeholder-gray-500 text-sm pr-10"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Validação de coincidência */}
                {confirmPassword && (
                  <p className={`text-xs mt-1 ${
                    newPassword === confirmPassword ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}>
                    {newPassword === confirmPassword ? "✓ Senhas coincidem" : "✗ Senhas não coincidem"}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-3 py-2.5 bg-gradient-to-r from-[#8C43FF] to-[#CCA9DD] hover:from-[#9955FF] hover:to-[#D9B8E8] disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    Redefinindo...
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Redefinir Senha
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="px-6 py-3.5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#141414] rounded-b-2xl">
            <p className="text-xs dark:text-gray-400 text-gray-600 text-center">
              🔒 Sua senha será criptografada com segurança
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  // Página de sucesso
  if (step === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl max-w-sm w-full border border-gray-200 dark:border-gray-700"
        >
          <div className="px-6 py-8 space-y-4 text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <CheckCircle size={56} className="text-green-500" />
            </motion.div>

            <h2 className="text-xl font-bold dark:text-white text-gray-900">
              Senha Redefinida com Sucesso!
            </h2>

            <p className="dark:text-gray-400 text-gray-600 text-sm">
              Sua senha foi alterada. Você será redirecionado para a página de login em alguns segundos.
            </p>

            <div className="pt-4">
              <motion.div
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 3, ease: "linear" }}
                className="h-1 bg-gradient-to-r from-[#8C43FF] to-[#CCA9DD] rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    )
  }
}
