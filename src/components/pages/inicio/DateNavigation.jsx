"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Period {
  time: string
  subject: string
  teacher?: string
  isVacant?: boolean
  isBreak?: boolean
}

interface DaySchedule {
  day: string
  periods: Period[]
}

const scheduleData: DaySchedule[] = [
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

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const tabs = ["Jornal Etec", "Patch Notes", "Eventos"]

  return (
    <div className="flex space-x-1 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeTab === tab
              ? "bg-[#8C43FF] text-white"
              : "text-gray-600 dark:text-gray-400 hover:text-[#8C43FF] hover:bg-gray-100 dark:hover:bg-[#2D2D2D]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default function DateNavigation() {
  const [currentIndex, setCurrentIndex] = useState(1) // Start with Tuesday (index 1)
  const [direction, setDirection] = useState(0)
  const [activeTab, setActiveTab] = useState("Jornal Etec")

  const navigateToDate = (newIndex: number, dir: number) => {
    if (newIndex >= 0 && newIndex < scheduleData.length) {
      setDirection(dir)
      setCurrentIndex(newIndex)
    }
  }

  const goToPrevious = () => {
    navigateToDate(currentIndex - 1, -1)
  }

  const goToNext = () => {
    navigateToDate(currentIndex + 1, 1)
  }

  const getVisibleDays = () => {
    const visible = []
    for (let i = currentIndex - 1; i <= currentIndex + 1; i++) {
      if (i >= 0 && i < scheduleData.length) {
        visible.push({ ...scheduleData[i], index: i })
      }
    }
    return visible
  }

  const today = new Date()
  const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

  return (
    <div className="flex flex-col h-full dark:bg-[#121212] bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8 dark:text-white text-gray-800">Início</h1>

        {/* Tabs */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Date Navigation Container */}
        <div className="relative flex items-center justify-center gap-4">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="flex-shrink-0 w-12 h-12 rounded-full bg-[#8C43FF] text-white flex items-center justify-center hover:bg-[#7A3AE6] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl disabled:hover:bg-[#8C43FF]"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Cards Container */}
          <div className="flex items-center gap-6 overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {getVisibleDays().map((daySchedule) => {
                const isCenter = daySchedule.index === currentIndex
                const isToday = daySchedule.day === weekDays[today.getDay()]

                return (
                  <motion.div
                    key={daySchedule.index}
                    custom={direction}
                    initial={{
                      opacity: isCenter ? 0 : 0.4,
                      scale: isCenter ? 0.9 : 0.7,
                      x: direction > 0 ? 100 : -100,
                    }}
                    animate={{
                      opacity: isCenter ? 1 : 0.4,
                      scale: isCenter ? 1 : 0.7,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.6,
                      x: direction < 0 ? 100 : -100,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className={`flex-shrink-0 transition-all duration-400 ${
                      isCenter ? "min-w-[320px] max-w-xs" : "min-w-[280px] max-w-[280px]"
                    }`}
                    onClick={() =>
                      !isCenter && navigateToDate(daySchedule.index, daySchedule.index > currentIndex ? 1 : -1)
                    }
                    style={{ cursor: isCenter ? "default" : "pointer" }}
                  >
                    <div
                      className={`dark:bg-[#1E1E1E] bg-white rounded-3xl p-5 shadow-lg border transition-all duration-400 ${
                        isCenter
                          ? isToday
                            ? "border-4 border-[#8C43FF] shadow-[0_0_15px_rgba(140,67,255,0.15)]"
                            : "border-2 border-[#8C43FF] shadow-[0_0_10px_rgba(140,67,255,0.1)]"
                          : "dark:border-[#333333] border-gray-200"
                      }`}
                    >
                      <h2
                        className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                          isCenter
                            ? isToday
                              ? "text-[#8C43FF]"
                              : "text-[#8C43FF]"
                            : "dark:text-gray-400 text-gray-600"
                        }`}
                      >
                        {daySchedule.day}
                        {isToday && isCenter && (
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-[#8C43FF] text-white text-xs align-middle">
                            Hoje
                          </span>
                        )}
                      </h2>
                      <div className="space-y-3">
                        {daySchedule.periods.map((period, periodIndex) => (
                          <motion.div
                            key={periodIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: isCenter ? periodIndex * 0.05 : 0 }}
                            className={`py-1 px-3 rounded-lg text-sm transition-all duration-300 ${
                              period.isBreak
                                ? "bg-[#F3EFFF] dark:bg-[#2D2D2D] text-[#8C43FF] font-semibold text-center"
                                : period.isVacant
                                  ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 font-semibold text-center"
                                  : "dark:bg-[#2D2D2D] bg-gray-50"
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span
                                className={`font-medium ${
                                  period.isBreak || period.isVacant
                                    ? "w-full text-center"
                                    : "dark:text-white text-gray-800"
                                }`}
                              >
                                {period.subject}
                              </span>
                              {!(period.isBreak || period.isVacant) && (
                                <span className="text-sm dark:text-gray-400 text-gray-500">{period.time}</span>
                              )}
                            </div>
                            {!(period.isBreak || period.isVacant) && (
                              <div className="text-sm dark:text-gray-400 text-gray-600">{period.teacher}</div>
                            )}
                            {period.isBreak && <div className="text-xs text-[#8C43FF]">{period.time}</div>}
                            {period.isVacant && (
                              <div className="text-xs text-yellow-700 dark:text-yellow-200">{period.time}</div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            disabled={currentIndex === scheduleData.length - 1}
            className="flex-shrink-0 w-12 h-12 rounded-full bg-[#8C43FF] text-white flex items-center justify-center hover:bg-[#7A3AE6] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl disabled:hover:bg-[#8C43FF]"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
