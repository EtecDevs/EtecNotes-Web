function Footer({ isAuthenticated = false, onNavigate, alwaysShowFull = false }) {
  const handleNav = (e, tab) => {
    if (e && e.preventDefault) e.preventDefault()
    if (typeof onNavigate === "function") onNavigate(tab)
  }
  const shouldShowFull = isAuthenticated || alwaysShowFull

  if (shouldShowFull) {
    return (
      <footer className="dark:bg-[#1E1E1E] bg-white border-t dark:border-[#333333] border-[#E6DFFF] px-6 transition-colors duration-300 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div>
            <h4 className="text-[#8C43FF] font-semibold mb-2">Links Rápidos</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              {/* For authenticated users these go to real pages; when forced full by guest we send to Login */}
              <li>
                <a
                  href="#"
                  onClick={(e) => handleNav(e, isAuthenticated ? "Início" : "Login")}
                  className="hover:underline"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleNav(e, isAuthenticated ? "Calendário" : "Login")}
                  className="hover:underline"
                >
                  Calendário
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleNav(e, isAuthenticated ? "Chat" : "Login")}
                  className="hover:underline"
                >
                  Chat
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => handleNav(e, isAuthenticated ? "Chat" : "Login")}
                  className="hover:underline"
                >
                  Chat
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#8C43FF] font-semibold mb-2">Contato</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">suporte@etecnotes.example</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Telefone: (00) 0 0000-0000</p>
          </div>

          <div>
            <h4 className="text-[#8C43FF] font-semibold mb-2">Minha Conta</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li><a href="#" onClick={(e) => handleNav(e, "Perfil")} className="hover:underline">Perfil</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, "Cloud")} className="hover:underline">Meus Arquivos</a></li>
            </ul>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="h-[60px] dark:bg-[#1E1E1E] bg-white border-t dark:border-[#333333] border-gray-200 px-6 transition-colors duration-300">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
        <div className="dark:text-gray-500 text-[#8C43FF] text-sm font-medium">© 2025 EtecNotes</div>
        <div className="flex space-x-4">
          <a href="#" onClick={(e) => handleNav(e, "Login")} className="dark:text-gray-500 text-[#8C43FF] text-sm hover:underline transition-colors">Login</a>
          <a href="#" className="dark:text-gray-500 text-[#8C43FF] text-sm hover:underline transition-colors">Contato</a>
          <a href="#" className="dark:text-gray-500 text-[#8C43FF] text-sm hover:underline transition-colors">Links Rápidos</a>
        </div>
      </div>
    </footer>
  )

}

export default Footer
