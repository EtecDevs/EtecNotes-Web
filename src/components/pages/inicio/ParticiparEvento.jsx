"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Copy, Upload, Check } from "lucide-react"

export default function ParticiparEvento() {
  const params = useParams()
  const router = useRouter()
  const [comprovante, setComprovante] = useState(null)
  const [copiado, setCopiado] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const eventos = {
    1: {
      titulo: "Show de Talentos",
      data: "25/08/2025",
      valor: "R$ 15,00",
      chavePix: "12345678900",
    },
    2: {
      titulo: "Feira Tecnológica",
      data: "15/09/2025",
      valor: "R$ 10,00",
      chavePix: "98765432100",
    },
  }

  const evento = eventos[params.id]

  const copiarChavePix = () => {
    navigator.clipboard.writeText(evento.chavePix)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setComprovante(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!comprovante) {
      alert("Por favor, anexe o comprovante de pagamento")
      return
    }

    // Aqui você enviaria o comprovante para o servidor
    setEnviado(true)
    setTimeout(() => {
      router.push("/eventos")
    }, 2000)
  }

  if (!evento) {
    return <div>Evento não encontrado</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Confirmar Participação</h1>

          {/* Informações do Evento */}
          <div className="bg-purple-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-purple-900 mb-2">{evento.titulo}</h2>
            <p className="text-purple-700 mb-1">Data: {evento.data}</p>
            <p className="text-purple-900 font-bold text-lg">Valor: {evento.valor}</p>
          </div>

          {/* Chave PIX */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Chave PIX para pagamento</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={evento.chavePix}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
              <button
                onClick={copiarChavePix}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                {copiado ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiado ? "Copiado!" : "Copiar"}
              </button>
            </div>
          </div>

          {/* Upload de Comprovante */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Anexar comprovante de pagamento</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="comprovante"
                />
                <label htmlFor="comprovante" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {comprovante ? comprovante.name : "Clique para selecionar ou arraste o arquivo"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG ou PDF (máx. 5MB)</p>
                </label>
              </div>
            </div>

            {/* Mensagem de Sucesso */}
            {enviado && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  ✓ Comprovante enviado com sucesso! Aguarde a aprovação da secretaria.
                </p>
              </div>
            )}

            {/* Botões */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={enviado}
                className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar Comprovante
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
