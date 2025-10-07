"use client"

import { useState } from "react"
import { ArrowLeft, Copy, Check, Upload, X, Calendar, MapPin, Clock, DollarSign, AlertCircle } from "lucide-react"
import { useAuth } from "../../../hooks/useAuth"

const EventConfirmationPage = ({ event, onBack, onConfirm }) => {
  const { user } = useAuth()
  const [copiedPix, setCopiedPix] = useState(false)
  const [receipt, setReceipt] = useState(null)
  const [receiptPreview, setReceiptPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // Chave PIX da escola (pode ser configurável)
  const pixKey = "etec.pagamentos@sp.gov.br"

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey)
    setCopiedPix(true)
    setTimeout(() => setCopiedPix(false), 2000)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validar tipo de arquivo
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"]
      if (!validTypes.includes(file.type)) {
        setError("Por favor, envie apenas imagens (JPG, PNG) ou PDF")
        return
      }

      // Validar tamanho (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("O arquivo deve ter no máximo 5MB")
        return
      }

      setReceipt(file)
      setError("")

      // Preview para imagens
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setReceiptPreview(reader.result)
        }
        reader.readAsDataURL(file)
      } else {
        setReceiptPreview(null)
      }
    }
  }

  const handleRemoveFile = () => {
    setReceipt(null)
    setReceiptPreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!receipt) {
      setError("Por favor, anexe o comprovante de pagamento")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Preparar dados para envio
      const formData = new FormData()
      formData.append("eventId", event.id)
      formData.append("eventTitle", event.title)
      formData.append("eventDate", event.date)
      formData.append("eventPrice", event.price)
      formData.append("userId", user.id)
      formData.append("userName", user.nome)
      formData.append("userEmail", user.email)
      formData.append("userRm", user.rm || "N/A")
      formData.append("receipt", receipt)
      formData.append("pixKey", pixKey)
      formData.append("submittedAt", new Date().toISOString())
      formData.append("status", "pending")

      // Simulação de envio (substituir por chamada real ao backend)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Log para debug
      console.log("📤 Comprovante enviado:", {
        event: event.title,
        user: user.nome,
        rm: user.rm,
        file: receipt.name,
        size: `${(receipt.size / 1024).toFixed(2)} KB`,
        price: `R$ ${event.price.toFixed(2)}`,
      })

      // TODO: Implementar chamada real ao backend
      // const response = await fetch('/api/events/payments/submit', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Authorization': `Bearer ${authService.getToken()}`
      //   }
      // })
      // 
      // if (!response.ok) {
      //   throw new Error('Erro ao enviar comprovante')
      // }

      setSuccess(true)
      
      // Notificar componente pai
      if (onConfirm) {
        onConfirm(event.id)
      }

      // Voltar após 3 segundos
      setTimeout(() => {
        onBack()
      }, 3000)
    } catch (err) {
      setError("Erro ao enviar comprovante. Tente novamente.")
      console.error("Erro ao enviar:", err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8C43FF] via-[#a76fff] to-[#553b7d] p-6 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Comprovante Enviado!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Seu comprovante foi enviado com sucesso para a Secretaria. Aguarde a validação.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <AlertCircle className="w-4 h-4 inline mr-2" />
              Você receberá uma notificação quando sua participação for aprovada.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8C43FF] via-[#a76fff] to-[#553b7d] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar aos Eventos</span>
          </button>
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            Confirmação de Participação
          </h1>
          <p className="text-white/80 mt-2">
            Complete o pagamento e envie o comprovante para confirmar sua participação
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informações do Evento */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Detalhes do Evento
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Data e Horário</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {new Date(event.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{event.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Local</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{event.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Valor</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    R$ {event.price ? event.price.toFixed(2) : "0,00"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {event.shortDescription}
              </p>
            </div>
          </div>

          {/* Formulário de Pagamento */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Dados de Pagamento
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Chave PIX */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Chave PIX da ETEC
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pixKey}
                    readOnly
                    className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                      copiedPix
                        ? "bg-green-500 text-white"
                        : "bg-purple-500 hover:bg-purple-600 text-white"
                    }`}
                  >
                    {copiedPix ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Use esta chave para realizar o pagamento via PIX
                </p>
              </div>

              {/* Upload de Comprovante */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Comprovante de Pagamento *
                </label>

                {!receipt ? (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-purple-500 dark:hover:border-purple-400 transition-colors bg-gray-50 dark:bg-gray-700/50">
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      Clique para anexar ou arraste o arquivo
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      PNG, JPG ou PDF (máx. 5MB)
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative">
                    {receiptPreview ? (
                      <div className="relative">
                        <img
                          src={receiptPreview}
                          alt="Preview do comprovante"
                          className="w-full h-48 object-cover rounded-xl border-2 border-gray-200 dark:border-gray-600"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                            <Upload className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white text-sm">
                              {receipt.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {(receipt.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mensagem de Erro */}
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-sm text-red-800 dark:text-red-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </p>
                </div>
              )}

              {/* Informações do Aluno */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
                  Seus dados:
                </p>
                <div className="space-y-1 text-sm text-blue-800 dark:text-blue-300">
                  <p><strong>Nome:</strong> {user.nome}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  {user.rm && <p><strong>RM:</strong> {user.rm}</p>}
                </div>
              </div>

              {/* Botão de Envio */}
              <button
                type="submit"
                disabled={loading || !receipt}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
                  loading || !receipt
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transform hover:scale-[1.02]"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  "Enviar Comprovante"
                )}
              </button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                Ao enviar, você confirma que realizou o pagamento e aguarda aprovação da Secretaria
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventConfirmationPage
