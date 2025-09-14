"use client"

import { useState } from "react"
import { Eye, EyeOff, GraduationCap } from "lucide-react"

export default function LoginPage({ onLogin, onCancel }) {
  const [showPassword, setShowPassword] = useState(false)
  const [codigo, setCodigo] = useState("")
  const [user, setUser] = useState("")
  const [senha, setSenha] = useState("")
  const [role, setRole] = useState("aluno")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock login: call onLogin directly. Real auth will be implemented later.
    if (typeof onLogin === "function") onLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-black p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Acesse sua conta</h1>
          <p className="text-purple-200">Faça login para ter acesso completo ao EtecNotes</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white block mb-1">Código ETEC</label>
              <input value={codigo} onChange={(e) => setCodigo(e.target.value)} className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white" placeholder="Digite o código da ETEC" required />
            </div>
            <div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-sm text-white block mb-1">Usuário</label>
                  <input value={user} onChange={(e) => setUser(e.target.value)} className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white" placeholder="RM ou login" required />
                </div>
                <div className="w-32 flex flex-col justify-end">
                  <label className="text-sm text-white block mb-1">Tipo</label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 border border-white/20 text-white font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                  >
                    <option value="administracao" className="text-white">Administração</option>
                    <option value="professor" className="text-white">Professor</option>
                    <option value="aluno" className="text-white">Aluno</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm text-white block mb-1">Senha</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full p-3 pr-10 rounded-xl bg-white/10 border border-white/20 text-white" placeholder="Senha" required />
                <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-200">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl">Acessar</button>
              <button type="button" onClick={onCancel} className="px-4 py-3 bg-white/10 text-white rounded-xl">Cancelar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
