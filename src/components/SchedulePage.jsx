"use client"

import { motion } from "framer-motion"
import TabNavigation from "./TabNavigation"

const SchedulePage = ({ activeTab, onTabChange }) => {
  // Dados de exemplo para os horários
  const scheduleData = [
    {
      day: "Segunda",
      periods: [
        { time: "08:00 - 08:50", subject: "Aula Vaga", isVacant: true },
        { time: "08:50 - 09:40", subject: "Aula Vaga", isVacant: true },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "Sistemas Embarcados", teacher: "Prof. Iury" },
        { time: "10:50 - 11:40", subject: "Sistemas Embarcados", teacher: "Prof. Iury" },
        { time: "11:40 - 12:30", subject: "Sociologia", teacher: "Prof. Elza" },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "EAMT", teacher: "Prof. Elza" },
        { time: "14:20 - 15:10", subject: "EAMT", teacher: "Prof. Elza" },
        { time: "15:10 - 16:00", subject: "EAMT", teacher: "Prof. Elza" },
      ],
    },
    {
      day: "Terça",
      periods: [
        { time: "08:00 - 08:50", subject: "P.W. I, II, III", teacher: "Prof. Paulo e William G." },
        { time: "08:50 - 09:40", subject: "Programação Web I, II e III", teacher: "Prof. Paulo e William G." },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "E.A.C.N.T.", teacher: "Prof. Elza e Prof. Andreia" },
        { time: "10:50 - 11:40", subject: "E.A.C.N.T.", teacher: "Prof. Elza e Prof. Andreia" },
        { time: "11:40 - 12:30", subject: "Matematica", teacher: "Prof. Santos" },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Inglês", teacher: "Prof. Fidélis" },
        { time: "14:20 - 15:10", subject: "Matematica", teacher: "Prof. William B." },
        { time: "15:10 - 16:00", subject: "Matematica", teacher: "Prof. William B." },
      ],
    },
    {
      day: "Quarta",
      periods: [
        { time: "08:00 - 08:50", subject: "P.A.M. I, II", teacher: "Prof. Paulo" },
        { time: "08:50 - 09:40", subject: "P.A.M. I, II", teacher: "Prof. Paulo" },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "IPSSI", teacher: "Prof. Iury e Prof. Vanessa" },
        { time: "10:00 - 10:50", subject: "IPSSI", teacher: "Prof. Iury e Prof. Vanessa" },
        { time: "11:40 - 12:30", subject: "Filosofia", teacher: "Prof. Silva" },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Biologia", teacher: "Prof. Andreia" },
        { time: "14:20 - 15:10", subject: "Biologia", teacher: "Prof. Andreia" },
        { time: "15:10 - 16:00", subject: "E.A.C.N.T.", teacher: "Prof. Andreia e Prof. Elza" },
      ],
    },
    {
      day: "Quinta",
      periods: [
        { time: "08:00 - 08:50", subject: "Português", teacher: "Prof. Fidélis" },
        { time: "08:50 - 09:40", subject: "Português", teacher: "Prof. Fidélis" },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "P.D.T.C.C.", teacher: "Prof. Veridiane e Prof. Elisângela" },
        { time: "10:50 - 11:40", subject: "P.D.T.C.C.", teacher: "Prof. Veridiane e Prof. Elisângela" },
        { time: "11:40 - 12:30", subject: "P.D.T.C.C.", teacher: "Prof. Veridiane e Prof. Elisângela" },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Português", teacher: "Prof. Fidélis" },
        { time: "14:20 - 15:10", subject: "Matematica", teacher: "Prof. William B." },
        { time: "15:10 - 16:00", subject: "Matematica", teacher: "Prof. William B." },
      ],
    },
    {
      day: "Sexta",
      periods: [
        { time: "08:00 - 08:50", subject: "Aula Vaga", isVacant: true },
        { time: "08:50 - 09:40", subject: "Filosofia", teacher: "Prof. Elza" },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
        { time: "10:00 - 10:50", subject: "Q.T.S.", teacher: "Prof. Iury e Prof. Gisbert" },
        { time: "10:50 - 11:40", subject: "Q.T.S.", teacher: "Prof. Iury e Prof. Gisbert" },
        { time: "11:40 - 12:30", subject: "Aula Vaga", isVacant: true },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Geografia", teacher: "Prof. Valdeci" },
        { time: "14:20 - 15:10", subject: "Geografia", teacher: "Prof. Valdeci" },
        { time: "15:10 - 16:00", subject: "Sociologia", teacher: "Prof. Elza" },
      ],
    },
  ]

  return (
    <div className="flex flex-col h-full dark:bg-[#121212] bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8 dark:text-white text-gray-800">Início</h1>

        {/* Tabs */}
        <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />

        {/* Dias da semana em linha com rolagem horizontal */}
        <div className="flex gap-6 overflow-x-auto pb-4">
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
                className={`min-w-[320px] max-w-xs flex-shrink-0 dark:bg-[#1E1E1E] bg-white rounded-3xl p-5 shadow-lg border dark:border-[#v8C43FF] border-black-200 transition-all
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
                          : period.isVacant
                            ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 font-semibold text-center"
                            : "dark:bg-[#2D2D2D] bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className={`font-medium ${
                          period.isBreak || period.isVacant
                            ? "w-full text-center"
                            : "dark:text-white text-gray-800"
                        }`}>
                          {period.subject}
                        </span>
                        {!(period.isBreak || period.isVacant) && (
                          <span className="text-sm dark:text-gray-400 text-gray-500">{period.time}</span>
                        )}
                      </div>
                      {!(period.isBreak || period.isVacant) && (
                        <div className="text-sm dark:text-gray-400 text-gray-600">{period.teacher}</div>
                      )}
                      {period.isBreak && (
                        <div className="text-xs text-[#8C43FF]">{period.time}</div>
                      )}
                      {period.isVacant && (
                        <div className="text-xs text-yellow-700 dark:text-yellow-200">{period.time}</div>
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
