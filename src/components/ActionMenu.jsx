"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, X, Edit3, CalendarIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const ActionMenu = ({ onAddNote, onAddEvent }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Fechar o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleAddNote = () => {
    onAddNote()
    setIsOpen(false)
  }

  const handleAddEvent = () => {
    onAddEvent()
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-8 right-8" ref={menuRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 mb-2 flex flex-col items-end space-y-2"
          >
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              onClick={handleAddNote}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg dark:bg-[#1E1E1E] bg-white shadow-lg"
            >
              <span className="text-sm font-medium dark:text-white text-gray-800">Nova Nota</span>
              <Edit3 size={18} className="text-[#8C43FF]" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              onClick={handleAddEvent}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg dark:bg-[#1E1E1E] bg-white shadow-lg"
            >
              <span className="text-sm font-medium dark:text-white text-gray-800">Novo Evento</span>
              <CalendarIcon size={18} className="text-[#00B2FF]" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMenu}
        className={`p-4 rounded-full shadow-lg transition-colors ${
          isOpen
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gradient-to-r from-[#8C43FF] to-[#00B2FF] hover:shadow-[0_0_15px_rgba(140,67,255,0.5)]"
        }`}
      >
        {isOpen ? <X size={24} className="text-white" /> : <Plus size={24} className="text-white" />}
      </motion.button>
    </div>
  )
}

export default ActionMenu
