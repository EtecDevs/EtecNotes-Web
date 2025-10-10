"use client"

import { Hash, LogOut, User } from "lucide-react"

const ForumSidebar = ({ courses, selectedCourse, onSelectCourse, currentUser }) => {
  // 🔍 DEBUG: Verificar dados recebidos
  console.log('🎓 ForumSidebar - Cursos recebidos:', courses.length, courses)
  console.log('🎓 ForumSidebar - Curso selecionado:', selectedCourse)
  
  return (
    <div className="w-64 border-r dark:border-gray-700 border-gray-300 dark:bg-[#1E1E1E] bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-700 border-gray-300 bg-gradient-to-r from-[#8C43FF] to-[#6B32C3]">
        <h1 className="text-xl font-bold text-white">EtecNotes</h1>
        <p className="text-xs text-white/90">Fórum Estudantil</p>
      </div>

      {/* Courses List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          <p className="text-xs font-semibold dark:text-gray-400 text-gray-600 px-2 py-2">
            CURSOS DISPONÍVEIS
          </p>
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                selectedCourse?.id === course.id
                  ? "dark:bg-[#8C43FF]/20 bg-[#8C43FF]/10 border-2 border-[#8C43FF]"
                  : "dark:bg-transparent bg-transparent border-2 border-transparent dark:hover:bg-[#2D2D2D] hover:bg-gray-100"
              }`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                selectedCourse?.id === course.id
                  ? "bg-[#8C43FF] text-white"
                  : "dark:bg-[#2D2D2D] bg-gray-200"
              }`}>
                <span className="text-lg">{course.icon || "📚"}</span>
              </div>
              <div className="flex-1 text-left">
                <div className={`font-medium text-sm ${
                  selectedCourse?.id === course.id
                    ? "dark:text-white text-gray-900"
                    : "dark:text-gray-300 text-gray-700"
                }`}>
                  {course.name}
                </div>
                {course.description && (
                  <div className="text-xs dark:text-gray-500 text-gray-600 truncate">
                    {course.description}
                  </div>
                )}
              </div>
            </button>
          ))}

          {courses.length === 0 && (
            <div className="text-center py-8 px-4">
              <div className="mb-3">
                <span className="text-4xl">📚</span>
              </div>
              <p className="text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">
                Nenhum curso disponível
              </p>
              <p className="text-xs dark:text-gray-500 text-gray-600">
                Aguarde enquanto carregamos os cursos...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t dark:border-gray-700 border-gray-300 dark:bg-[#2D2D2D]/50 bg-gray-50">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full dark:bg-[#8C43FF] bg-[#8C43FF] text-white">
            <User size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium dark:text-white text-gray-900 truncate">
              {currentUser?.displayName || currentUser?.email?.split('@')[0] || "Usuário"}
            </p>
            <p className="text-xs dark:text-gray-400 text-gray-600 truncate">
              {currentUser?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForumSidebar
