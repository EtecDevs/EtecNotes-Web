import { Home, Calendar, MessageCircle, User, Cloud, Plus, HelpCircle, Menu } from 'lucide-react';

function Header() {
  return (
    <header className="h-[60px] bg-white border-b border-gray-100 flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <div className="flex h-full">
            <div className="w-1/2 bg-[#8C43FF]"></div>
            <div className="w-1/2 bg-[#D0B3FF]"></div>
          </div>
        </div>
        <span className="ml-2 text-[#2D2E37] font-bold text-lg">EtecNotes</span>
      </div>

      {/* Navigation Icons */}
      <div className="hidden md:flex items-center space-x-6">
        <button className="p-1.5 rounded-md text-[#8C43FF] transition-all duration-300 hover:text-[#8C43FF] hover:bg-[#8C43FF]/10 hover:shadow-[0_0_15px_rgba(140,67,255,0.5)]">
          <Home size={28} />
        </button>
        <button className="p-1.5 rounded-md text-[#D0B3FF] transition-all duration-300 hover:text-[#8C43FF] hover:bg-[#8C43FF]/10 hover:shadow-[0_0_15px_rgba(140,67,255,0.5)]">
          <Calendar size={28} />
        </button>
        <button className="p-1.5 rounded-md text-[#D0B3FF] transition-all duration-300 hover:text-[#8C43FF] hover:bg-[#8C43FF]/10 hover:shadow-[0_0_15px_rgba(140,67,255,0.5)]">
          <MessageCircle size={28} />
        </button>
        <button className="p-1.5 rounded-md text-[#D0B3FF] transition-all duration-300 hover:text-[#8C43FF] hover:bg-[#8C43FF]/10 hover:shadow-[0_0_15px_rgba(140,67,255,0.5)]">
          <User size={28} />
        </button>
        <button className="p-1.5 rounded-md text-[#D0B3FF] transition-all duration-300 hover:text-[#8C43FF] hover:bg-[#8C43FF]/10 hover:shadow-[0_0_15px_rgba(140,67,255,0.5)]">
          <Cloud size={28} />
        </button>
        <button className="p-1.5 rounded-md text-[#D0B3FF] transition-all duration-300 hover:text-[#8C43FF] hover:bg-[#8C43FF]/10 hover:shadow-[0_0_15px_rgba(140,67,255,0.5)]">
          <Plus size={28} />
        </button>
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-4">
        <button className="p-1.5 rounded-full border border-black transition-all duration-300 hover:bg-black/5 hover:shadow-[0_0_10px_rgba(0,0,0,0.2)]">
          <HelpCircle size={20} className="text-black" />
        </button>
        <button className="p-1.5 text-[#D0B3FF] transition-all duration-300 hover:text-[#8C43FF] hover:bg-[#8C43FF]/10 hover:rounded-md hover:shadow-[0_0_15px_rgba(140,67,255,0.5)]">
          <Menu size={28} />
        </button>
      </div>
    </header>
  );
}

export default Header;