"use client"

import { useState } from "react"
import { Hash, LogOut, User, GripVertical, Search, X, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const ForumSidebar = ({ courses, selectedCourse, onSelectCourse, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar cursos baseado na busca (apenas por título)
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 🔍 DEBUG: Verificar dados recebidos
  console.log('🎓 ForumSidebar - Cursos recebidos:', courses.length, courses)
  console.log('🎓 ForumSidebar - Curso selecionado:', selectedCourse)
  
  return (
    <div className="h-full border-r dark:border-[#30363D] border-gray-200 dark:bg-[#1E1E1E] bg-white flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-4 border-b dark:border-[#30363D] border-gray-200">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-2"
        >
          <div className="flex items-center gap-2">
            <motion.div 
              className="p-2 rounded-2xl bg-gradient-to-br from-[#8C43FF] to-[#6B32C3]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={18} className="text-white" />
            </motion.div>
            <div>
              <h1 className="text-lg font-bold dark:text-white text-gray-900">TecTalk</h1>
              <p className="text-xs dark:text-gray-400 text-gray-600">Fórum Estudantil</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 rounded-2xl dark:bg-[#0D1117] bg-gray-50">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" title="Online" />
            <span className="text-xs font-medium dark:text-gray-400 text-gray-600">
              {courses.length}
            </span>
          </div>
        </motion.div>
        
        {/* Search Bar */}
        <div className="relative mt-3">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-gray-400 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-2xl dark:bg-[#0D1117] bg-gray-50 border dark:border-[#30363D] border-gray-200 dark:text-white text-gray-900 text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-[#2D2D2D] transition-colors"
            >
              <X size={14} className="dark:text-gray-400 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* Courses List */}
      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
        <div className="space-y-2">
          {searchTerm && (
            <div className="px-2 py-1 mb-2">
              <p className="text-xs dark:text-gray-400 text-gray-600">
                {filteredCourses.length} {filteredCourses.length === 1 ? 'resultado' : 'resultados'} para "{searchTerm}"
              </p>
            </div>
          )}
          
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <motion.button
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectCourse(course)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all ${
                  selectedCourse?.id === course.id
                    ? "dark:bg-[#0D1117] bg-gray-100 border-2 border-[#8C43FF]"
                    : "dark:bg-transparent bg-transparent hover:bg-gray-50 dark:hover:bg-[#0D1117] border-2 border-transparent"
                }`}
              >
              {/* Ícone do curso */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-2xl transition-all ${
                selectedCourse?.id === course.id
                  ? "bg-[#8C43FF] text-white"
                  : "dark:bg-[#0D1117] bg-gray-100 group-hover:bg-[#8C43FF]/10"
              }`}>
                <span className="text-xl">{course.icon || "📚"}</span>
              </div>
              
              {/* Informações do curso */}
              <div className="flex-1 text-left min-w-0">
                <div className={`font-medium text-sm truncate ${
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
            </motion.button>
          ))}
          </AnimatePresence>

          {filteredCourses.length === 0 && courses.length > 0 && (
            <div className="text-center py-8 px-4">
              <Search size={32} className="mx-auto mb-3 dark:text-gray-600 text-gray-400" />
              <p className="text-sm font-medium dark:text-gray-400 text-gray-600 mb-1">
                Nenhum curso encontrado
              </p>
              <p className="text-xs dark:text-gray-500 text-gray-500">
                Tente buscar com outros termos
              </p>
            </div>
          )}

          {courses.length === 0 && (
            <div className="text-center py-8 px-4">
              <span className="text-4xl mb-3 block">📚</span>
              <p className="text-sm font-medium dark:text-gray-400 text-gray-600 mb-1">
                Nenhum curso disponível
              </p>
              <p className="text-xs dark:text-gray-500 text-gray-500">
                Aguarde enquanto carregamos...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t dark:border-[#30363D] border-gray-200">
        <div className="flex items-center gap-3 p-2 rounded-2xl dark:bg-[#0D1117] bg-gray-50">
          <div className="relative">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#8C43FF] text-white">
              <User size={16} />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 dark:border-[#0D1117] border-gray-50" />
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

      {/* CSS para scrollbar customizada */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8C43FF;
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9955ff;
        }
      `}</style>
    </div>
  )
}

export default ForumSidebar
