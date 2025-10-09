"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function SchedulePage({ activeTab, onTabChange }) {
  const [currentIndex, setCurrentIndex] = useState(1) // Start with Tuesday (index 1)
  // Set default activeTab if not provided
  const defaultActiveTab = activeTab || "Jornal Etec"

  // Schedule data for the days of the week
  const scheduleData = [
    {
      day: "Segunda",
      periods: [
        { time: "08:00 - 08:50", subject: "Aula Vaga", isVacant: true },
        { time: "08:50 - 09:40", subject: "Aula Vaga", isVacant: true },
        { time: "09:40 - 10:00", subject: "Intervalo", isBreak: true },
  { time: "10:00 - 10:50", subject: "Sistemas Embarcados", teacher: "Prof. Iury", lab: 2 },
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
  { time: "10:00 - 10:50", subject: "E.A.C.N.T.", teacher: "Prof. Elza e Prof. Andreia", lab: 2 },
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
        { time: "10:50 - 11:40", subject: "IPSSI", teacher: "Prof. Iury e Prof. Vanessa" },
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
  { time: "10:00 - 10:50", subject: "P.D.T.C.C.", teacher: "Prof. Veridiane e Prof. Elisângela", lab: 3 },
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
  { time: "10:00 - 10:50", subject: "Q.T.S.", teacher: "Prof. Iury e Prof. Gisbert", lab: 4 },
        { time: "10:50 - 11:40", subject: "Q.T.S.", teacher: "Prof. Iury e Prof. Gisbert" },
        { time: "11:40 - 12:30", subject: "Aula Vaga", isVacant: true },
        { time: "12:30 - 13:30", subject: "Almoço", isBreak: true },
        { time: "13:30 - 14:20", subject: "Geografia", teacher: "Prof. Valdeci" },
        { time: "14:20 - 15:10", subject: "Geografia", teacher: "Prof. Valdeci" },
        { time: "15:10 - 16:00", subject: "Sociologia", teacher: "Prof. Elza" },
      ],
    },
  ]

  const navigateToDate = (newIndex) => {
    if (newIndex >= 0 && newIndex < scheduleData.length) {
      setCurrentIndex(newIndex)
    }
  }

  const goToPrevious = () => {
    navigateToDate(currentIndex - 1)
  }

  const goToNext = () => {
    navigateToDate(currentIndex + 1)
  }

  const today = new Date()
  const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

  // Calculate the transform offset for the carousel
  const cardWidth = 350 // Width including gap (otimizado para altura)
  const offset = -currentIndex * cardWidth

  return (
    <div className="flex flex-col h-full">

        {/* Date Navigation Container */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="absolute left-0 z-10 w-12 h-12 rounded-full bg-[#8C43FF] text-white flex items-center justify-center hover:bg-[#7A3AE6] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl disabled:hover:bg-[#8C43FF]"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden w-[1050px]">
            <motion.div
              className="flex gap-5"
              animate={{
                x: offset + 350, // Center the middle card
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.6,
              }}
            >
              {scheduleData.map((daySchedule, index) => {
                const isCenter = index === currentIndex
                const isVisible = Math.abs(index - currentIndex) <= 1
                const isToday = daySchedule.day === weekDays[today.getDay()]

                return (
                  <motion.div
                  key={index}
                  className="flex-shrink-0 w-[340px]"
                  animate={{
                    scale: isCenter ? 1 : 0.7,
                    opacity: isCenter ? 1 : isVisible ? 0.4 : 0,
                    zIndex: isCenter ? 10 : 1,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  onClick={() => !isCenter && isVisible && navigateToDate(index)}
                  style={{
                    cursor: isCenter ? "default" : isVisible ? "pointer" : "default",
                    pointerEvents: isVisible ? "auto" : "none",
                  }}
                  >
                  <div
                    className={`dark:bg-[#1E1E1E] bg-white rounded-3xl p-4 shadow-lg border transition-all duration-400 ${
                    isCenter
                      ? isToday
                      ? "border-4 border-[#8C43FF] shadow-[0_0_15px_rgba(140,67,255,0.15)]"
                      : "border-2 border-[#8C43FF] shadow-[0_0_10px_rgba(140,67,255,0.1)]"
                      : "dark:border-[#333333] border-gray-200"
                    }`}
                  >
                    <h2
                    className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                      isCenter ? "text-[#8C43FF]" : "dark:text-gray-400 text-gray-600"
                    }`}
                    >
                    {daySchedule.day}
                    {isToday && isCenter && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-[#8C43FF] text-white text-xs align-middle">
                      Hoje
                      </span>
                    )}
                    </h2>
                    <div className="space-y-3 ">
                    {daySchedule.periods.map((period, periodIndex) => (
                      <motion.div
                      key={periodIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: isCenter ? 1 : 0.7,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: isCenter ? periodIndex * 0.03 : 0,
                      }}
                      className={`relative py-0.5 px-3 rounded-xl text-sm transition-all duration-300 ${
                        period.isBreak
                        ? "bg-[#F3EFFF] dark:bg-[#2D2D2D] text-[#8C43FF] font-semibold text-center"
                        : period.isVacant
                          ? "bg-[#8C43FF] dark:bg-[#8C43FF] text-white font-semibold text-center"
                          : "dark:bg-[#2D2D2D] bg-gray-100"
                      }`}
                      >
                      <div className="flex justify-between items-center mb-0.5">
                        <div>
                          <span
                            className={`font-medium ${
                              period.isBreak || period.isVacant
                              ? "w-full text-center"
                              : "dark:text-white text-gray-800"
                            }`}
                          >
                            {period.subject}
                          </span>
                        </div>

                        {!(period.isBreak || period.isVacant) && (
                          <span className="text-xs dark:text-gray-400 text-gray-500">{period.time}</span>
                        )}
                      </div>
                      {!(period.isBreak || period.isVacant) && (
                        <div className="text-xs dark:text-gray-400 text-gray-600">
                          <div>{period.teacher}</div>
                        </div>
                      )}

                      {/* Bottom-right compact Lab badge */}
                      {typeof period.lab === 'number' && (
                        <div className="absolute bottom-2 right-3 z-10 pointer-events-auto">
                          <div className="relative inline-block group">
                            <span
                              className="inline-flex items-center bg-[#8C43FF] text-white px-2 py-0.5 rounded-full text-xs font-medium"
                              aria-hidden="true"
                            >
                              Lab {period.lab}
                            </span>

                            {/* Custom tooltip (subtle) */}
                            <div className="absolute right-0 -bottom-12 w-max max-w-xs bg-white text-gray-800 text-xs px-2 py-1 rounded-md shadow-md opacity-0 scale-95 transform origin-bottom-right transition-all duration-150 pointer-events-none group-hover:opacity-100 group-hover:scale-100 dark:bg-[#0f1724] dark:text-white">
                              O(a) professor(a) escolheu o Lab {period.lab} para esta aula
                            </div>
                          </div>
                        </div>
                      )}
                      {period.isBreak && <div className="text-xs text-[#8C43FF]">{period.time}</div>}
                      {period.isVacant && (
                        <div className="text-xs text-white">{period.time}</div>
                      )}
                      </motion.div>
                    ))}
                    </div>
                  </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            disabled={currentIndex === scheduleData.length - 1}
            className="absolute right-0 z-10 w-12 h-12 rounded-full bg-[#8C43FF] text-white flex items-center justify-center hover:bg-[#7A3AE6] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl disabled:hover:bg-[#8C43FF]"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
    </div>
  )
}
