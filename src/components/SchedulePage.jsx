"use client"

import { motion } from "framer-motion"
import TabNavigation from "./TabNavigation"

const SchedulePage = ({ activeTab, onTabChange }) => {
  // Dados de exemplo para os horários
  const scheduleData = [
    {
      day: "Segunda",
      periods: [
        { time: "08:00 - 08:50", subject: "Matemática", teacher: "Prof. Silva" },
        { time: "08:50 - 09:40", subject: "Português", teacher: "Prof. Oliveira" },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "Física", teacher: "Prof. Santos" },
        { time: "10:50 - 11:40", subject: "Química", teacher: "Prof. Costa" },
        { time: "11:40 - 12:30", subject: "Biologia", teacher: "Prof. Pereira" },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "História", teacher: "Prof. Almeida" },
        { time: "14:20 - 15:10", subject: "Geografia", teacher: "Prof. Lima" },
        { time: "15:10 - 16:00", subject: "Inglês", teacher: "Prof. Souza" },
      ],
    },
    {
      day: "Terça",
      periods: [
        { time: "08:00 - 08:50", subject: "Ed. Física", teacher: "Prof. Ferreira" },
        { time: "08:50 - 09:40", subject: "Artes", teacher: "Prof. Ribeiro" },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "Matemática", teacher: "Prof. Silva" },
        { time: "10:50 - 11:40", subject: "Português", teacher: "Prof. Oliveira" },
        { time: "11:40 - 12:30", subject: "Física", teacher: "Prof. Santos" },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Química", teacher: "Prof. Costa" },
        { time: "14:20 - 15:10", subject: "Biologia", teacher: "Prof. Pereira" },
        { time: "15:10 - 16:00", subject: "História", teacher: "Prof. Almeida" },
      ],
    },
    {
      day: "Quarta",
      periods: [
        { time: "08:00 - 08:50", subject: "Geografia", teacher: "Prof. Lima" },
        { time: "08:50 - 09:40", subject: "Inglês", teacher: "Prof. Souza" },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "Ed. Física", teacher: "Prof. Ferreira" },
        { time: "10:50 - 11:40", subject: "Artes", teacher: "Prof. Ribeiro" },
        { time: "11:40 - 12:30", subject: "Matemática", teacher: "Prof. Silva" },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Português", teacher: "Prof. Oliveira" },
        { time: "14:20 - 15:10", subject: "Física", teacher: "Prof. Santos" },
        { time: "15:10 - 16:00", subject: "Química", teacher: "Prof. Costa" },
      ],
    },
    {
      day: "Quinta",
      periods: [
        { time: "08:00 - 08:50", subject: "Biologia", teacher: "Prof. Pereira" },
        { time: "08:50 - 09:40", subject: "História", teacher: "Prof. Almeida" },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "Geografia", teacher: "Prof. Lima" },
        { time: "10:50 - 11:40", subject: "Inglês", teacher: "Prof. Souza" },
        { time: "11:40 - 12:30", subject: "Ed. Física", teacher: "Prof. Ferreira" },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Artes", teacher: "Prof. Ribeiro" },
        { time: "14:20 - 15:10", subject: "Matemática", teacher: "Prof. Silva" },
        { time: "15:10 - 16:00", subject: "Português", teacher: "Prof. Oliveira" },
      ],
    },
    {
      day: "Sexta",
      periods: [
        { time: "08:00 - 08:50", subject: "Programação", teacher: "Prof. Martins" },
        { time: "08:50 - 09:40", subject: "Banco de Dados", teacher: "Prof. Gomes" },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "Redes", teacher: "Prof. Dias" },
        { time: "10:50 - 11:40", subject: "Sistemas", teacher: "Prof. Carvalho" },
        { time: "11:40 - 12:30", subject: "Projeto", teacher: "Prof. Mendes" },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Matemática", teacher: "Prof. Silva" },
        { time: "14:20 - 15:10", subject: "Português", teacher: "Prof. Oliveira" },
        { time: "15:10 - 16:00", subject: "Física", teacher: "Prof. Santos" },
      ],
    },
  ]

  return (
    <div className="flex flex-col h-full dark:bg-[#121212] bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8 dark:text-white text-gray-800">Início</h1>

        {/* Tabs */}
        <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scheduleData.map((daySchedule, index) => {
            // Verifica se é o dia da semana atual
            const today = new Date();
            const weekDays = [
              "Domingo",
              "Segunda",
              "Terça",
              "Quarta",
              "Quinta",
              "Sexta",
              "Sábado"
            ];
            const isToday =
              daySchedule.day === weekDays[today.getDay()];
            return (
              <motion.div
                key={daySchedule.day}
                className={`dark:bg-[#1E1E1E] bg-white rounded-3xl p-5 shadow-lg border dark:border-[#v8C43FF] border-black-200 transition-all
                  ${isToday ? "border-4 border-[#8C43FF] shadow-[0_0_15px_rgba(140,67,255,0.15)]" : ""}
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h2 className={`text-xl font-semibold mb-4 ${isToday ? "text-[#8C43FF]" : "dark:text-white text-gray-800"}`}>
                  {daySchedule.day}
                  {isToday && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-[#8C43FF] text-white text-xs align-middle">Hoje</span>
                  )}
                </h2>
                <div className="space-y-3">
                  {daySchedule.periods.map((period, periodIndex) => (
                    <div
                      key={periodIndex}
                      className={`py-1 px-3 rounded-lg text-sm ${
                        period.isBreak
                          ? "bg-[#F3EFFF] dark:bg-[#2D2D2D] text-[#8C43FF] font-semibold text-center"
                          : "dark:bg-[#2D2D2D] bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className={`font-medium ${period.isBreak ? "w-full text-center" : "dark:text-white text-gray-800"}`}>
                          {period.subject}
                        </span>
                        {!period.isBreak && (
                          <span className="text-sm dark:text-gray-400 text-gray-500">{period.time}</span>
                        )}
                      </div>
                      {!period.isBreak && (
                        <div className="text-sm dark:text-gray-400 text-gray-600">{period.teacher}</div>
                      )}
                      {period.isBreak && (
                        <div className="text-xs text-[#8C43FF]">{period.time}</div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SchedulePage
