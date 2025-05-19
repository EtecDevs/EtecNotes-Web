"use client"

import { X } from "lucide-react"
import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const Modal = ({ isOpen, onClose, title, children }) => {
  // Fechar o modal com a tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Impedir o scroll do body quando o modal estiver aberto
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  // Impedir que cliques dentro do modal fechem o modal
  const handleContentClick = (e) => {
    e.stopPropagation()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md p-6 rounded-2xl shadow-xl dark:bg-[#1E1E1E] bg-white"
            onClick={handleContentClick}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold dark:text-white text-gray-800">{title}</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full dark:text-gray-400 text-gray-500 hover:bg-gray-100 dark:hover:bg-[#333333] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
