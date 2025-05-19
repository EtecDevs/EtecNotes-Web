"use client"

import { motion } from "framer-motion"
import TabNavigation from "./TabNavigation"

const SchedulePage = ({ activeTab, onTabChange }) => {
  // Dados de exemplo para os horários
  const scheduleData = [
    {
      day: "Segunda",
      periods: [
        { time: "07:30 - 08:20", subject: "Matemática", teacher: "Prof. Silva" },
        { time: "08:20 - 09:10", subject: "Português", teacher: "Prof. Oliveira" },
        { time: "09:10 - 10:00", subject: "Física", teacher: "Prof. Santos" },
        { time: "10:20 - 11:10", subject: "Química", teacher: "Prof. Costa" },
        { time: "11:10 - 12:00", subject: "Biologia", teacher: "Prof. Pereira" },
      ],
    },
    {
      day: "Terça",
      periods: [
        { time: "07:30 - 08:20", subject: "História", teacher: "Prof. Almeida" },
        { time: "08:20 - 09:10", subject: "Geografia", teacher: "Prof. Lima" },
        { time: "09:10 - 10:00", subject: "Inglês", teacher: "Prof. Souza" },
        { time: "10:20 - 11:10", subject: "Ed. Física", teacher: "Prof. Ferreira" },
        { time: "11:10 - 12:00", subject: "Artes", teacher: "Prof. Ribeiro" },
      ],
    },
    {
      day: "Quarta",
      periods: [
        { time: "07:30 - 08:20", subject: "Matemática", teacher: "Prof. Silva" },
        { time: "08:20 - 09:10", subject: "Português", teacher: "Prof. Oliveira" },
        { time: "09:10 - 10:00", subject: "Física", teacher: "Prof. Santos" },
        { time: "10:20 - 11:10", subject: "Química", teacher: "Prof. Costa" },
        { time: "11:10 - 12:00", subject: "Biologia", teacher: "Prof. Pereira" },
      ],
    },
    {
      day: "Quinta",
      periods: [
        { time: "07:30 - 08:20", subject: "História", teacher: "Prof. Almeida" },
        { time: "08:20 - 09:10", subject: "Geografia", teacher: "Prof. Lima" },
        { time: "09:10 - 10:00", subject: "Inglês", teacher: "Prof. Souza" },
        { time: "10:20 - 11:10", subject: "Ed. Física", teacher: "Prof. Ferreira" },
        { time: "11:10 - 12:00", subject: "Artes", teacher: "Prof. Ribeiro" },
      ],
    },
    {
      day: "Sexta",
      periods: [
        { time: "07:30 - 08:20", subject: "Programação", teacher: "Prof. Martins" },
        { time: "08:20 - 09:10", subject: "Banco de Dados", teacher: "Prof. Gomes" },
        { time: "09:10 - 10:00", subject: "Redes", teacher: "Prof. Dias" },
        { time: "10:20 - 11:10", subject: "Sistemas", teacher: "Prof. Carvalho" },
        { time: "11:10 - 12:00", subject: "Projeto", teacher: "Prof. Mendes" },
      ],
    },
  ]

  return (
    <div className="flex flex-col h-full dark:bg-[#121212] bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8 dark:text-white text-gray-800">Horários</h1>

        {/* Tabs - Adicionado aqui para manter consistência */}
        <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scheduleData.map((daySchedule, index) => (
            <motion.div
              key={daySchedule.day}
              className="dark:bg-[#1E1E1E] bg-white rounded-3xl p-6 shadow-lg border dark:border-[#333333] border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-4 dark:text-white text-gray-800">{daySchedule.day}</h2>
              <div className="space-y-3">
                {daySchedule.periods.map((period, periodIndex) => (
                  <div key={periodIndex} className="p-3 dark:bg-[#2D2D2D] bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium dark:text-white text-gray-800">{period.subject}</span>
                      <span className="text-sm dark:text-gray-400 text-gray-500">{period.time}</span>
                    </div>
                    <div className="text-sm dark:text-gray-400 text-gray-600">{period.teacher}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SchedulePage
