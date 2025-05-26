import { Home, Calendar, MessageCircle, User, Cloud, Plus, HelpCircle, Menu } from "lucide-react"
import LogoEtecNotes from "../assets/LogoEtecNotes.png"

// Adicione activeTab e onMainTabChange como props
function Header({ activeTab, onMainTabChange }) {
  return (
    <header className="h-[60px] bg-white border-b border-gray-100 flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={LogoEtecNotes}
          alt="Logo EtecNotes"
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
        <span className="ml-2 text-[#2D2E37] font-bold text-lg">EtecNotes</span>
      </div>

      {/* Navigation Icons */}
      <div className="hidden md:flex items-center space-x-6">
        <button
          className={`p-1.5 rounded-md transition-all duration-300 hover:bg-gray-100 ${
            (activeTab === "Início" || activeTab === "Patch Notes" || activeTab === "Horários")
              ? "text-[#8C43FF]"
              : "text-[#D0B3FF]"
          }`}
          onClick={() => onMainTabChange && onMainTabChange("Início")}
        >
          <Home size={28} />
        </button>
        <button
          className={`p-1.5 rounded-md transition-all duration-300 hover:bg-gray-100 ${
            activeTab === "Calendário" ? "text-[#8C43FF]" : "text-[#D0B3FF]"
          }`}
          onClick={() => onMainTabChange && onMainTabChange("Calendário")}
        >
          <Calendar size={28} />
        </button>
        <button
          className={`p-1.5 rounded-md transition-all duration-300 hover:bg-gray-100 ${
            activeTab === "Chat" ? "text-[#8C43FF]" : "text-[#D0B3FF]"
          }`}
          onClick={() => onMainTabChange && onMainTabChange("Chat")}
        >
          <MessageCircle size={28} />
        </button>
        <button
          className={`p-1.5 rounded-md transition-all duration-300 hover:bg-gray-100 ${
            activeTab === "Perfil" ? "text-[#8C43FF]" : "text-[#D0B3FF]"
          }`}
          onClick={() => onMainTabChange && onMainTabChange("Perfil")}
        >
          <User size={28} />
        </button>
        <button
          className={`p-1.5 rounded-md transition-all duration-300 hover:bg-gray-100 ${
            activeTab === "Cloud" ? "text-[#8C43FF]" : "text-[#D0B3FF]"
          }`}
          onClick={() => onMainTabChange && onMainTabChange("Cloud")}
        >
          <Cloud size={28} />
        </button>
        <button className="p-1.5 rounded-md text-[#D0B3FF]">
          <Plus size={28} />
        </button>
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-4">
        <button className="p-1.5 rounded-full border border-black cursor-pointer">
          <HelpCircle size={20} className="text-black" />
        </button>
        <button className="p-1.5 text-[#D0B3FF] cursor-pointer">
          <Menu size={28} />
        </button>
      </div>
    </header>
  )
}

export default Header
