"use client"

import { useState } from "react"
import Modal from "./Modal"
import { Clock } from "lucide-react"

const AddEventModal = ({ isOpen, onClose, onSave, selectedDate }) => {
  const [eventData, setEventData] = useState({
    title: "",
    time: "",
    type: "event", // event, reminder, exam
    description: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setEventData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validar se pelo menos o título foi preenchido
    if (!eventData.title.trim()) return

    // Criar um novo evento com ID único
    const newEvent = {
      ...eventData,
      id: Date.now(),
      date: selectedDate,
    }

    onSave(newEvent)
    onClose()

    // Resetar o formulário
    setEventData({
      title: "",
      time: "",
      type: "event",
      description: "",
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adicionar Evento">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 text-sm font-medium dark:text-gray-300 text-gray-700">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-full dark:bg-[#2D2D2D] dark:border-[#3D3D3D] dark:text-white bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
            placeholder="Título do evento"
            required
          />
        </div>

        <div>
          <label htmlFor="time" className="block mb-1 text-sm font-medium dark:text-gray-300 text-gray-700">
            Horário
          </label>
          <div className="relative">
            <input
              type="time"
              id="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              className="w-full p-2.5 pl-9 border rounded-full dark:bg-[#2D2D2D] dark:border-[#3D3D3D] dark:text-white bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
            />
            <Clock
              size={16}
              className="absolute left-2.5 top-1/2 transform -translate-y-1/2 dark:text-gray-400 text-gray-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="type" className="block mb-1 text-sm font-medium dark:text-gray-300 text-gray-700">
            Tipo
          </label>
          <select
            id="type"
            name="type"
            value={eventData.type}
            onChange={handleChange}
            className="w-full p-2.5 border rounded-full dark:bg-[#2D2D2D] dark:border-[#3D3D3D] dark:text-white bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
          >
            <option value="event">Evento</option>
            <option value="reminder">Lembrete</option>
            <option value="exam">Prova</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 text-sm font-medium dark:text-gray-300 text-gray-700">
            Descrição (opcional)
          </label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            rows="3"
            className="w-full p-2.5 border rounded-2xl dark:bg-[#2D2D2D] dark:border-[#3D3D3D] dark:text-white bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8C43FF]"
            placeholder="Descrição do evento"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-full dark:bg-[#2D2D2D] dark:text-white dark:hover:bg-[#3D3D3D] bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white rounded-full bg-[#8C43FF] hover:bg-[#9955FF] transition-colors"
          >
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddEventModal
