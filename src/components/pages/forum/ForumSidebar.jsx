"use client"

import { Hash, LogOut, User, GripVertical } from "lucide-react"

const ForumSidebar = ({ courses, selectedCourse, onSelectCourse, currentUser }) => {
  // 🔍 DEBUG: Verificar dados recebidos
  console.log('🎓 ForumSidebar - Cursos recebidos:', courses.length, courses)
  console.log('🎓 ForumSidebar - Curso selecionado:', selectedCourse)
  
  return (
    <div className="h-full border-r dark:border-gray-700/50 border-gray-300/50 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#1E1E1E] bg-gradient-to-b from-white to-gray-50 flex flex-col shadow-xl">
      {/* Header com gradiente moderno */}
      <div className="p-5 border-b dark:border-gray-700/50 border-gray-300/50 bg-gradient-to-r from-[#8C43FF] via-[#7B3FE4] to-[#6B32C3] shadow-lg">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold text-white tracking-tight">EtecNotes</h1>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" title="Online" />
        </div>
        <p className="text-sm text-white/90 font-medium">Fórum Estudantil</p>
      </div>

      {/* Courses List com scroll suave */}
      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
        <div className="space-y-2">
          <div className="flex items-center justify-between px-2 py-2">
            <p className="text-xs font-bold dark:text-gray-400 text-gray-600 uppercase tracking-wider">
              Cursos Disponíveis
            </p>
            <span className="text-xs font-semibold dark:text-[#8C43FF] text-[#8C43FF] bg-[#8C43FF]/10 px-2 py-0.5 rounded-full">
              {courses.length}
            </span>
          </div>
          
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className={`w-full group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${
                selectedCourse?.id === course.id
                  ? "dark:bg-gradient-to-r dark:from-[#8C43FF]/30 dark:to-[#6B32C3]/20 bg-gradient-to-r from-[#8C43FF]/20 to-[#6B32C3]/10 shadow-lg shadow-[#8C43FF]/20 border-2 border-[#8C43FF]/50"
                  : "dark:bg-[#252525]/50 bg-white/80 backdrop-blur-sm border-2 border-transparent dark:hover:bg-[#2D2D2D] hover:bg-gray-100 dark:hover:border-gray-600/50 hover:border-gray-300 hover:shadow-md"
              }`}
            >
              {/* Ícone do curso */}
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                selectedCourse?.id === course.id
                  ? "bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] text-white shadow-lg shadow-[#8C43FF]/30 scale-110"
                  : "dark:bg-[#333333] bg-gray-200 group-hover:bg-[#8C43FF]/20 group-hover:scale-105"
              }`}>
                <span className="text-2xl">{course.icon || "📚"}</span>
              </div>
              
              {/* Informações do curso */}
              <div className="flex-1 text-left min-w-0">
                <div className={`font-semibold text-sm mb-0.5 truncate transition-colors ${
                  selectedCourse?.id === course.id
                    ? "dark:text-white text-gray-900"
                    : "dark:text-gray-200 text-gray-800 group-hover:text-[#8C43FF]"
                }`}>
                  {course.name}
                </div>
                {course.description && (
                  <div className="text-xs dark:text-gray-400 text-gray-600 truncate">
                    {course.description}
                  </div>
                )}
              </div>
              
              {/* Indicador de seleção */}
              {selectedCourse?.id === course.id && (
                <div className="w-1.5 h-8 bg-white rounded-full shadow-lg" />
              )}
            </button>
          ))}

          {courses.length === 0 && (
            <div className="text-center py-12 px-4">
              <div className="mb-4 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#8C43FF]/10 rounded-full animate-pulse" />
                </div>
                <span className="text-6xl relative z-10">📚</span>
              </div>
              <p className="text-base font-semibold dark:text-gray-300 text-gray-700 mb-2">
                Nenhum curso disponível
              </p>
              <p className="text-xs dark:text-gray-500 text-gray-600">
                Aguarde enquanto carregamos os cursos...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* User Profile Footer moderno */}
      <div className="p-4 border-t dark:border-gray-700/50 border-gray-300/50 dark:bg-gradient-to-r dark:from-[#1a1a1a] dark:to-[#252525] bg-gradient-to-r from-gray-50 to-white backdrop-blur-lg">
        <div className="flex items-center gap-3 p-3 rounded-2xl dark:bg-[#2D2D2D]/50 bg-white/80 border dark:border-gray-700/50 border-gray-200 shadow-md">
          <div className="relative">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] text-white shadow-lg shadow-[#8C43FF]/30">
              <User size={18} />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 dark:border-[#2D2D2D] border-white shadow-sm" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold dark:text-white text-gray-900 truncate">
              {currentUser?.displayName || currentUser?.email?.split('@')[0] || "Usuário"}
            </p>
            <p className="text-xs dark:text-gray-400 text-gray-600 truncate">
              {currentUser?.email}
            </p>
          </div>
        </div>
      </div>

      {/* CSS para scrollbar customizada */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8C43FF;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B32C3;
        }
      `}</style>
    </div>
  )
}

export default ForumSidebar
