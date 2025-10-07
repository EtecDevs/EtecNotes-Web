"use client"

import { useState } from "react"
import { Check, X, Download } from "lucide-react"

export default function ComprovantesSecretaria() {
  const [comprovantes, setComprovantes] = useState([
    {
      id: 1,
      aluno: "João Silva",
      rm: "12345",
      evento: "Show de Talentos",
      valor: "R$ 15,00",
      data: "20/08/2025",
      status: "pendente",
      comprovante: "/comprovante-pix.jpg",
    },
    {
      id: 2,
      aluno: "Maria Santos",
      rm: "67890",
      evento: "Feira Tecnológica",
      valor: "R$ 10,00",
      data: "21/08/2025",
      status: "pendente",
      comprovante: "/comprovante-pix.jpg",
    },
  ])

  const aprovarComprovante = (id) => {
    setComprovantes(comprovantes.map((c) => (c.id === id ? { ...c, status: "aprovado" } : c)))
  }

  const rejeitarComprovante = (id) => {
    setComprovantes(comprovantes.map((c) => (c.id === id ? { ...c, status: "rejeitado" } : c)))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Comprovantes de Pagamento</h1>

        <div className="space-y-4">
          {comprovantes.map((comprovante) => (
            <div key={comprovante.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex gap-6">
                {/* Comprovante */}
                <div className="w-64 flex-shrink-0">
                  <img
                    src={comprovante.comprovante || "/placeholder.svg"}
                    alt="Comprovante"
                    className="w-full h-40 object-cover rounded-lg border border-gray-200"
                  />
                  <button className="mt-2 w-full px-4 py-2 text-sm text-purple-600 hover:text-purple-700 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Baixar comprovante
                  </button>
                </div>

                {/* Informações */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{comprovante.aluno}</h3>
                      <p className="text-sm text-gray-600">RM: {comprovante.rm}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        comprovante.status === "aprovado"
                          ? "bg-green-100 text-green-800"
                          : comprovante.status === "rejeitado"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {comprovante.status === "aprovado"
                        ? "Aprovado"
                        : comprovante.status === "rejeitado"
                          ? "Rejeitado"
                          : "Pendente"}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Evento</p>
                      <p className="text-sm font-medium text-gray-900">{comprovante.evento}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Valor</p>
                      <p className="text-sm font-medium text-gray-900">{comprovante.valor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Data de envio</p>
                      <p className="text-sm font-medium text-gray-900">{comprovante.data}</p>
                    </div>
                  </div>

                  {/* Ações */}
                  {comprovante.status === "pendente" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => aprovarComprovante(comprovante.id)}
                        className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Aprovar
                      </button>
                      <button
                        onClick={() => rejeitarComprovante(comprovante.id)}
                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Rejeitar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
