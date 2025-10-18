import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, Eye, EyeOff, Mail, CheckCircle } from "lucide-react"

export default function PasswordResetPage({ token, email, onSuccess, onError }) {
  const [step, setStep] = useState("verify")
  const [verifyCode, setVerifyCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++
    return strength
  }

  const handlePasswordChange = (value) => {
    setNewPassword(value)
    setPasswordStrength(calculatePasswordStrength(value))
  }

  const handleVerify = (e) => {
    e.preventDefault()
    console.log("Verificação de código:", verifyCode)
    setStep("reset")
  }

  const handleResetPassword = (e) => {
    e.preventDefault()
    console.log("Reset de senha:", { email, newPassword })
    setStep("success")
  }

  if (step === "verify") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl max-w-sm w-full border border-gray-200 dark:border-gray-700"
        >
          <div className="px-6 pt-5 pb-3 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold dark:text-white text-gray-900">Verificar Identidade</h1>
          </div>

          <div className="px-6 py-5 space-y-4">
            <div className="flex justify-center mb-4">
              <Mail size={48} className="text-[#8C43FF]" />
            </div>

            <p className="dark:text-gray-400 text-gray-600 text-sm text-center">
              Enviamos um código de verificação para <span className="font-semibold">{email}</span>
            </p>

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
                />
              </div>

              <button
                type="submit"
                className="w-full px-3 py-2.5 bg-gradient-to-r from-[#8C43FF] to-[#CCA9DD] hover:from-[#9955FF] hover:to-[#D9B8E8] text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <Mail size={16} />
                Verificar Código
              </button>
            </form>
          </div>

          <div className="px-6 py-3.5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#141414] rounded-b-2xl">
            <p className="text-xs dark:text-gray-400 text-gray-600 text-center">
               Verifique sua pasta de spam se não receber o email
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

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
          <div className="px-6 pt-5 pb-3 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold dark:text-white text-gray-900">Redefinir Senha</h1>
          </div>

          <div className="px-6 py-5 space-y-4">
            <div className="flex justify-center mb-4">
              <Lock size={48} className="text-[#8C43FF]" />
            </div>

            <form onSubmit={handleResetPassword} className="space-y-3">
              <div>
                <label className="block text-xs font-medium dark:text-gray-300 text-gray-700 mb-1.5">
                  Nova Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder="Crie uma senha forte"
                    className="w-full px-3 py-2 rounded-lg dark:bg-[#2D2D2D] bg-gray-50 dark:text-white text-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#8C43FF] placeholder-gray-400 dark:placeholder-gray-500 text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

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
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {confirmPassword && (
                  <p className={`text-xs mt-1 ${
                    newPassword === confirmPassword ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}>
                    {newPassword === confirmPassword ? " Senhas coincidem" : " Senhas não coincidem"}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-3 py-2.5 bg-gradient-to-r from-[#8C43FF] to-[#CCA9DD] hover:from-[#9955FF] hover:to-[#D9B8E8] text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <Lock size={16} />
                Redefinir Senha
              </button>
            </form>
          </div>

          <div className="px-6 py-3.5 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#141414] rounded-b-2xl">
            <p className="text-xs dark:text-gray-400 text-gray-600 text-center">
               Sua senha será criptografada com segurança
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

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
