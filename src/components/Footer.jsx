import { useAuth } from "../hooks/useAuth"
import { Home, Calendar, MessageCircle, Info, Cloud, User, Mail, Phone } from "lucide-react"
import { motion } from "framer-motion"
import MiniFlappyGame from "./ui/MiniFlappyGame"

function Footer({ isAuthenticated = false, onNavigate, alwaysShowFull = false }) {
  const { user } = useAuth()
  
  const handleNav = (e, tab) => {
    if (e && e.preventDefault) e.preventDefault()
    if (typeof onNavigate === "function") onNavigate(tab)
  }

  // Função para determinar a página de dashboard baseada na role
  const getDashboardPage = () => {
    if (!isAuthenticated || !user) return "Dashboard : Login"
    
    const role = user.role
    
    // Aluno vai para Perfil
    if (role === 'aluno') return "Perfil"
    
    // Professor vai para Dashboard do Professor
    if (role === 'professor') return "TeacherDashboard"
    
    // Secretaria vai para Dashboard da Etec
    if (role === 'SECRETARIA') return "EtecDashboard"
    
    // Administrador vai para Dashboard Admin
    if (role === 'ADMINISTRADOR') return "AdminDashboard"
    
    // Fallback para login
    return "Dashboard : Login"
  }

  const shouldShowFull = isAuthenticated || alwaysShowFull

  // Animações para o efeito zigue-zague
  const zigzagVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  }

  if (shouldShowFull) {
    return (
      <footer className="bg-[#58417d] dark:bg-[#181818] border-t border-[#2d2d2d] mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Container principal com jogo */}
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between mb-12">
            {/* Layout Zigue-Zague (Links) */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start">
            
            {/* Seção 1 - Links Rápidos (Topo Esquerda) */}
            <motion.div 
              className="lg:mt-0"
              initial="hidden"
              animate="visible"
              custom={0}
              variants={zigzagVariants}
            >
              <h4 className="text-[#8b5cf6] font-semibold text-lg mb-6 flex items-center gap-2 font-mono tracking-tight">
                <span className="w-1.5 h-1.5 bg-[#8b5cf6] rounded-full animate-pulse"></span>
                Links Rápidos
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleNav(e, isAuthenticated ? "Início" : "Login")}
                    className="text-[#d1d5db] hover:text-[#8b5cf6] transition-all duration-300 flex items-center gap-3 group text-sm"
                  >
                    <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Início</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleNav(e, isAuthenticated ? "Calendário" : "Login")}
                    className="text-[#d1d5db] hover:text-[#8b5cf6] transition-all duration-300 flex items-center gap-3 group text-sm"
                  >
                    <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Calendário</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleNav(e, isAuthenticated ? "Chat" : "Login")}
                    className="text-[#d1d5db] hover:text-[#8b5cf6] transition-all duration-300 flex items-center gap-3 group text-sm"
                  >
                    <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Chat</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleNav(e, "Sobre Nós")}
                    className="text-[#d1d5db] hover:text-[#8b5cf6] transition-all duration-300 flex items-center gap-3 group text-sm"
                  >
                    <Info className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Sobre Nós</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleNav(e, "Cloud : Login")}
                    className="text-[#d1d5db] hover:text-[#8b5cf6] transition-all duration-300 flex items-center gap-3 group text-sm"
                  >
                    <Cloud className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Cloud</span>
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Seção 2 - Contato (Centro Direita - Offset) */}
            <motion.div 
              className="lg:mt-12"
              initial="hidden"
              animate="visible"
              custom={1}
              variants={zigzagVariants}
            >
              <h4 className="text-[#8b5cf6] font-semibold text-lg mb-6 flex items-center gap-2 font-mono tracking-tight">
                <span className="w-1.5 h-1.5 bg-[#8b5cf6] rounded-full animate-pulse"></span>
                Contato
              </h4>
              <div className="space-y-4">
                <a
                  href="mailto:suporte@etecnotes.com"
                  className="text-[#d1d5db] hover:text-[#8b5cf6] transition-all duration-300 flex items-center gap-3 group text-sm"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">suporte@etecnotes.com</span>
                </a>
                <a
                  href="tel:+5513999999999"
                  className="text-[#d1d5db] hover:text-[#8b5cf6] transition-all duration-300 flex items-center gap-3 group text-sm"
                >
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">(13) 99999-9999</span>
                </a>
              </div>
              
              {/* Separador decorativo */}
              <div className="flex items-center gap-2 mt-8">
                <div className="w-2 h-2 rounded-full bg-[#8b5cf6] opacity-40"></div>
                <div className="w-2 h-2 rounded-full bg-[#8b5cf6] opacity-60"></div>
                <div className="w-2 h-2 rounded-full bg-[#8b5cf6] opacity-80"></div>
              </div>
            </motion.div>

            {/* Seção 3 - Minha Conta (Baixo Esquerda) */}
            <motion.div 
              className="lg:mt-24"
              initial="hidden"
              animate="visible"
              custom={2}
              variants={zigzagVariants}
            >
              <h4 className="text-[#8b5cf6] font-semibold text-lg mb-6 flex items-center gap-2 font-mono tracking-tight">
                <span className="w-1.5 h-1.5 bg-[#8b5cf6] rounded-full animate-pulse"></span>
                Minha Conta
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    onClick={(e) => handleNav(e, "Perfil")}
                    className="text-[#d1d5db] hover:text-[#8b5cf6] transition-all duration-300 flex items-center gap-3 group text-sm"
                  >
                    <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:translate-x-1 transition-transform">Perfil</span>
                  </a>
                </li>
              </ul>
            </motion.div>
            </div>

            {/* Mini Jogo no canto direito */}
            <motion.div 
              className="lg:sticky lg:top-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <MiniFlappyGame />
            </motion.div>
          </div>

          {/* Linha separadora sutil */}
          <div className="mt-8 mb-8 h-px bg-gradient-to-r from-transparent via-[#2d2d2d] to-transparent"></div>

          {/* Copyright centralizado */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="text-[#6b7280] text-sm font-mono">
              © 2025 <span className="text-[#8b5cf6] font-semibold">EtecNotes</span> — Todos os direitos reservados.
            </p>
          </motion.div>
        </div>
      </footer>
    )
  }

  // Footer simplificado para não autenticados
  return (
    <footer className="bg-[#181818] border-t border-[#2d2d2d] mt-12">
      <div className="h-20 max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="text-[#6b7280] text-sm font-mono">
          © 2025 <span className="text-[#8b5cf6] font-semibold">EtecNotes</span>
        </div>
        <div className="flex items-center gap-6">
          <a 
            href="#" 
            onClick={(e) => handleNav(e, "Login")} 
            className="text-[#d1d5db] hover:text-[#8b5cf6] text-sm transition-colors duration-300"
          >
            Login
          </a>
          <span className="w-1 h-1 rounded-full bg-[#2d2d2d]"></span>
          <a 
            href="#" 
            className="text-[#d1d5db] hover:text-[#8b5cf6] text-sm transition-colors duration-300"
          >
            Contato
          </a>
          <span className="w-1 h-1 rounded-full bg-[#2d2d2d]"></span>
          <a 
            href="#" 
            className="text-[#d1d5db] hover:text-[#8b5cf6] text-sm transition-colors duration-300"
          >
            Links Rápidos
          </a>
        </div>
      </div>
    </footer>
  )

}

export default Footer
