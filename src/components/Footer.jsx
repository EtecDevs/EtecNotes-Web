function Footer() {
  return (
    <footer className="h-[80px] dark:bg-[#1E1E1E] bg-white border-t dark:border-[#333333] border-[#E6DFFF] px-6 transition-colors duration-300">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="dark:text-gray-500 text-[#8C43FF] text-base font-medium">© 2025 EtecNotes</div>
        <div className="flex space-x-4">
          <a href="#" className="dark:text-gray-500 text-[#8C43FF] text-base hover:underline hover:text-[#6B32C3] dark:hover:text-white transition-colors">
            Privacidade
          </a>
          <a href="#" className="dark:text-gray-500 text-[#8C43FF] text-base hover:underline hover:text-[#6B32C3] dark:hover:text-white transition-colors">
            Termos de Uso
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
