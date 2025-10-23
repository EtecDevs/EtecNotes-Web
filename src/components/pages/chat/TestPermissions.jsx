import React from 'react';
import { Building, FileText, Archive, Settings, Eye } from 'lucide-react';

const TestPermissions = ({ userRole = 'ALUNO' }) => {
  const isStudent = userRole === 'ALUNO' || userRole === 'MONITOR_LAB';
  const isProfOrAdmin = userRole === 'PROFESSOR' || userRole === 'SECRETARIA' || userRole === 'ADMINISTRADOR';

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sistema de Requerimentos - {userRole}
        </h2>
        
        <div className="space-y-4">
          {/* Botões para Alunos */}
          {isStudent && (
            <>
              <div className="text-lg font-semibold text-blue-600 mb-2">Requerimentos do Aluno:</div>
              <button className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl transition-all duration-300 shadow-lg font-semibold">
                <FileText size={18} />
                <span>Novo Requerimento (Geral/Justificativa)</span>
              </button>
              
              <button className="w-full flex items-center justify-between gap-3 py-4 px-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl transition-all duration-300 shadow-lg font-semibold">
                <div className="flex items-center gap-3">
                  <Archive size={18} />
                  <span>Meus Requerimentos</span>
                </div>
                <Eye size={16} />
              </button>
            </>
          )}

          {/* Botões para Professores e Administradores */}
          {isProfOrAdmin && (
            <>
              <div className="text-lg font-semibold text-orange-600 mb-2">Requerimentos do {userRole}:</div>
              <button className="w-full flex items-center justify-center gap-3 py-4 px-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl transition-all duration-300 shadow-lg font-semibold">
                <Building size={18} />
                <span>Requerimento Geral (Professor/Admin)</span>
              </button>
              
              <button className="w-full flex items-center justify-between gap-3 py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all duration-300 shadow-lg font-semibold">
                <div className="flex items-center gap-3">
                  <Archive size={18} />
                  <span>Gerenciar Requerimentos</span>
                </div>
                <Settings size={16} />
              </button>
            </>
          )}
        </div>

        {/* Selector de Role para Teste */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-sm font-semibold text-gray-600 mb-3">Testar como:</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <button 
              onClick={() => window.location.reload()}
              className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-all"
            >
              ALUNO
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-3 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-all"
            >
              PROFESSOR
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-3 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-all"
            >
              SECRETARIA
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-3 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-all"
            >
              ADMIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPermissions;