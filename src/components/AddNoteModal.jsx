"use client"

import { useState } from "react"
import Modal from "./Modal"
import { Edit3 } from "lucide-react"

const AddNoteModal = ({ isOpen, onClose, onSave, selectedDate }) => {
  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNoteData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validar se pelo menos o título foi preenchido
    if (!noteData.title.trim()) return

    // Criar uma nova nota com ID único
    const newNote = {
      ...noteData,
      id: Date.now(),
      date: selectedDate,
      type: "note",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    onSave(newNote)
    onClose()

    // Resetar o formulário
    setNoteData({
      title: "",
      content: "",
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adicionar Nota">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="note-title" className="block mb-1 text-sm font-medium dark:text-gray-300 text-gray-700">
            Título
          </label>
          <input
            type="text"
            id="note-title"
            name="title"
            value={noteData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg dark:bg-[#2D2D2D] dark:border-[#3D3D3D] dark:text-white bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
            placeholder="Título da nota"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block mb-1 text-sm font-medium dark:text-gray-300 text-gray-700">
            Conteúdo
          </label>
          <div className="relative">
            <textarea
              id="content"
              name="content"
              value={noteData.content}
              onChange={handleChange}
              rows="5"
              className="w-full p-2 pl-8 border rounded-lg dark:bg-[#2D2D2D] dark:border-[#3D3D3D] dark:text-white bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
              placeholder="Conteúdo da nota..."
            ></textarea>
            <Edit3 size={16} className="absolute left-2.5 top-3 dark:text-gray-400 text-gray-500" />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg dark:bg-[#2D2D2D] dark:text-white dark:hover:bg-[#3D3D3D] bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-[#8C43FF] hover:bg-[#9955FF] transition-colors"
          >
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddNoteModal