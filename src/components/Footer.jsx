function Footer() {
  return (
    <footer className="h-[80px] bg-white border-t border-[#E6DFFF] px-6">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-[#8C43FF] text-base font-medium">© 2025 EtecNotes</div>
        <div className="flex space-x-4">
          <a 
            href="#" 
            className="text-[#8C43FF] text-base transition-all duration-300 hover:text-[#6B32C3] hover:underline hover:shadow-[0_0_10px_rgba(140,67,255,0.5)]"
          >
            Privacidade
          </a>
          <a 
            href="#" 
            className="text-[#8C43FF] text-base transition-all duration-300 hover:text-[#6B32C3] hover:underline hover:shadow-[0_0_10px_rgba(140,67,255,0.5)]"
          >
            Termos de Uso
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;