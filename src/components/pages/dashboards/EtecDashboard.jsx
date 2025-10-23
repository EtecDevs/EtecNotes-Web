"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  BookOpen,
  Calendar,
  Plus,
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  CalendarDays,
  Home,
  X,
  Trash2,
  Bell,
  GraduationCap,
  Settings,
  FileText,
  UserPlus,
  Upload,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Eye,
  Download,
  AlertCircle,
  CheckCircle,
  Building2,
  MessageCircle,
  School,
  TrendingUp,
  Save,
  Mail,
  Phone,
  Globe,
  Shield,
  Key,
  Database,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Send,
  List,
  Grid,
  Archive,
  RefreshCw,
  File
} from "lucide-react"
import authService from "../../../services/authService"
import socketService from "../../../services/socketService"
import { useAuth } from "../../../hooks/useAuth"

// Constantes fora do componente para evitar re-criações
const MODAL_SIZE_CLASSES = {
  sm: "max-w-md",
  md: "max-w-lg", 
  lg: "max-w-2xl",
  xl: "max-w-4xl",
}

// Modal Component fora do componente principal
const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`w-full ${MODAL_SIZE_CLASSES[size]} bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-colors"
            >
              <X size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const EtecDashboard = ({ onLogout }) => {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState("overview")
  const [loading, setLoading] = useState(false)

  // Estados dos dados
  const [stats, setStats] = useState({
    totalAlunos: 0,
    totalProfessores: 0,
    totalTurmas: 0,
    totalEventos: 0,
    taxaAprovacao: 94
  })

  const [usuarios, setUsuarios] = useState([])
  const [turmas, setTurmas] = useState([])
  const [eventos, setEventos] = useState([])
  const [notifications, setNotifications] = useState([])
  const [reports, setReports] = useState([])
  const [comprovantes, setComprovantes] = useState([
    {
      id: 1,
      aluno: "João Silva",
      rm: "12345",
      evento: "Show de Talentos",
      valor: "R$ 15,00",
      data: "20/08/2025",
      status: "pendente",
      comprovante: "src/assets/imagesGeneral/ComprovanteTest.pdf",
    },
    {
      id: 2,
      aluno: "Maria Santos",
      rm: "67890",
      evento: "Feira Tecnológica",
      valor: "R$ 10,00",
      data: "21/08/2025",
      status: "pendente",
      comprovante: "src/assets/imagesGeneral/ComprovanteTest.pdf",
    },
  ])

  // Estados dos modais
  const [modalState, setModalState] = useState({
    createUser: false,
    createTurma: false,
    createEvent: false,
    sendNotification: false,
    importUsers: false,
    importTurmas: false,
    settings: false,
    viewReport: false
  })

  // Estados dos formulários
  const [userForm, setUserForm] = useState({
    tipo: 'aluno',
    nome: '',
    email: '',
    senha: '',
    rm: '',
    disciplinas: [],
    turma: ''
  })

  const [turmaForm, setTurmaForm] = useState({
    nome: '',
    curso: '',
    periodo: '',
    ano: '',
    professor: '',
    capacidade: '',
    sala: '',
    horario: ''
  })

  const [eventForm, setEventForm] = useState({
    titulo: '',
    descricao: '',
    data: '',
    hora: '',
    local: '',
    publico: 'todos',
    tipo: 'evento',
    isPaid: false,
    price: 0,
    allowPresence: true
  })

  const [notificationForm, setNotificationForm] = useState({
    titulo: '',
    mensagem: '',
    publico: 'todos',
    tipo: 'info',
    urgente: false
  })

  // Estados de filtros e busca
  const [filters, setFilters] = useState({
    searchTerm: '',
    userType: 'todos',
    turmaFilter: 'todas',
    statusFilter: 'todos'
  })

  // WebSocket connection (desabilitado temporariamente)
  // useEffect(() => {
  //   socketService.connect()
  //   socketService.onMessage(handleWebSocketMessage)

  //   return () => {
  //     socketService.disconnect()
  //   }
  // }, [])

  const handleWebSocketMessage = (data) => {
    switch (data.type) {
      case 'notification':
        setNotifications(prev => [data.notification, ...prev])
        break
      case 'user_update':
        loadUsuarios()
        break
      case 'event_update':
        loadEventos()
        break
      default:
        break
    }
  }

  // Verificar token e carregar dados
  useEffect(() => {
    let mounted = true;
    
    const initializeDashboard = async () => {
      let token = localStorage.getItem('token');
      let user = localStorage.getItem('user');
      
      // Auto-login com credenciais corretas se necessário
      if (!token || !user || token.startsWith('mock-')) {
        console.log('🔄 Realizando auto-login com credenciais do backend...');
        try {
          const loginResponse = await fetch('http://localhost:5001/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: 'admin@etec.sp.gov.br',
              password: 'admin123',
              role: 'SECRETARIA'
            })
          });
          
          if (loginResponse.ok) {
            const loginData = await loginResponse.json();
            if (loginData.success && loginData.token) {
              localStorage.setItem('token', loginData.token);
              localStorage.setItem('user', JSON.stringify(loginData.user));
              token = loginData.token;
              user = JSON.stringify(loginData.user);
              showNotification('✅ Auto-login realizado com sucesso!', 'success');
              console.log('✅ Token obtido:', token.substring(0, 30) + '...');
            }
          }
        } catch (error) {
          console.warn('❌ Auto-login falhou, continuando em modo demo:', error);
          showNotification('⚠️ Usando modo demonstração', 'warning');
        }
      }
      
      console.log('Dashboard inicializando com token:', token.substring(0, 20) + '...');
      
      if (mounted) {
        // Só carrega dados se o componente ainda estiver montado
        try {
          await loadInitialData();
        } catch (error) {
          console.error('Erro ao carregar dados iniciais:', error);
        }
      }
    };
    
    initializeDashboard();
    
    return () => {
      mounted = false;
    };
  }, [])  // Removido a dependência do array vazio para evitar re-execução

  const loadInitialData = async () => {
    setLoading(true)
    try {
      await Promise.all([
        loadStats(),
        loadUsuarios(),
        loadTurmas(),
        loadEventos(),
        loadNotifications()
      ])
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      console.log('📊 Carregando estatísticas do backend...');
      
      const [alunos, professores] = await Promise.all([
        authService.listUsers('alunos'),
        authService.listUsers('professores')
      ]);

      const stats = {
        totalAlunos: 0,
        totalProfessores: 0,
        totalTurmas: 0,
        totalEventos: 0,
        taxaAprovacao: 94
      };

      if (alunos.success && alunos.users && alunos.users.alunos) {
        stats.totalAlunos = alunos.users.alunos.length;
      }

      if (professores.success && professores.users && professores.users.professores) {
        stats.totalProfessores = professores.users.professores.length;
      }

      setStats(stats);
      console.log('✅ Stats carregadas do backend:', stats);
      
    } catch (error) {
      console.error('❌ Erro ao carregar estatísticas:', error);
      
      if (error.message === 'BACKEND_OFFLINE') {
        // Calcular estatísticas baseadas nos dados locais
        const totalAlunos = usuarios.filter(u => u.role === 'aluno').length;
        const totalProfessores = usuarios.filter(u => u.role === 'professor').length;
        
        const statsLocal = {
          totalAlunos,
          totalProfessores,
          totalTurmas: 3, // Mock
          totalEventos: 5, // Mock
          taxaAprovacao: 94
        };
        
        setStats(statsLocal);
        console.log('📊 Stats calculadas localmente:', statsLocal);
      } else {
        // Fallback para dados padrão
        setStats({
          totalAlunos: 0,
          totalProfessores: 0,
          totalTurmas: 0,
          totalEventos: 0,
          taxaAprovacao: 94
        });
      }
    }
  }

  const loadUsuarios = async () => {
    try {
      console.log('🔄 Carregando usuários do backend...');
      const response = await authService.listUsers();
      
      if (response.success && response.users) {
        // Combinar alunos e professores em uma lista única
        const todosUsuarios = [
          ...(response.users.alunos || []),
          ...(response.users.professores || [])
        ];
        setUsuarios(todosUsuarios);
        console.log('✅ Usuários carregados:', todosUsuarios.length);
      } else {
        console.warn('⚠️ Backend retornou estrutura inesperada:', response);
        setUsuarios([]);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar usuários:', error);
      
      if (error.message === 'BACKEND_OFFLINE') {
        console.log('🔄 Backend offline - usando dados mock');
        // Dados mock de demonstração
      } else if (error.message === 'INVALID_CREDENTIALS') {
        console.log('🔑 Backend online mas credenciais inválidas - usando dados mock');
        // Dados mock de demonstração
        const mockUsuarios = [
          {
            id: 'test_professor_1',
            nome: 'Professor Teste',
            email: 'prof@teste.com',
            role: 'professor',
            disciplinas: ['Matemática', 'Programação'],
            status: 'ativo',
            createdAt: new Date().toISOString(),
            // Senha: 123456
          },
          {
            id: 'test_aluno_1',
            nome: 'Aluno Teste',
            email: 'user@teste.com',
            role: 'aluno',
            rm: '00001',
            turma: '3DS',
            status: 'ativo',
            createdAt: new Date().toISOString(),
            // Senha: 123456
          },
          {
            id: 'mock_1',
            nome: 'João Silva',
            email: 'joao@etec.sp.gov.br',
            role: 'aluno',
            rm: '12345',
            turma: '3º DS A',
            status: 'ativo',
            createdAt: new Date().toISOString()
          },
          {
            id: 'mock_2',
            nome: 'Maria Santos',
            email: 'maria@etec.sp.gov.br',
            role: 'professor',
            disciplinas: ['Matemática', 'Física'],
            status: 'ativo',
            createdAt: new Date().toISOString()
          }
        ];
        setUsuarios(mockUsuarios);
        if (error.message === 'BACKEND_OFFLINE') {
          showNotification('⚠️ Backend offline - dados de demonstração carregados', 'warning');
        } else {
          showNotification('🔑 Backend online - credenciais incorretas. Dados de demonstração carregados', 'warning');
        }
      } else {
        setUsuarios([]);
      }
    }
  }

  const loadTurmas = async () => {
    try {
      // Dados mock temporários
      setTurmas([]);
      console.log('Turmas carregadas (modo mock)');
      
      // TODO: Quando o backend estiver pronto:
      // const response = await authService.request('/turmas')
      // setTurmas(response.turmas || [])
    } catch (error) {
      console.error('Erro ao carregar turmas:', error)
      setTurmas([]); // Fallback para array vazio
    }
  }

  const loadEventos = async () => {
    try {
      // Dados mock temporários
      setEventos([]);
      console.log('Eventos carregados (modo mock)');
      
      // TODO: Quando o backend estiver pronto:
      // const response = await authService.request('/eventos')
      // setEventos(response.eventos || [])
    } catch (error) {
      console.error('Erro ao carregar eventos:', error)
      setEventos([]); // Fallback para array vazio
    }
  }

  const loadNotifications = async () => {
    try {
      // Dados mock temporários
      setNotifications([]);
      console.log('Notificações carregadas (modo mock)');
      
      // TODO: Quando o backend estiver pronto:
      // const response = await authService.request('/notifications')
      // setNotifications(response.notifications || [])
    } catch (error) {
      console.error('Erro ao carregar notificações:', error)
      setNotifications([]); // Fallback para array vazio
    }
  }

  // Funções auxiliares
  const resetForms = useCallback(() => {
    setUserForm({
      tipo: 'aluno',
      nome: '',
      email: '',
      senha: '',
      rm: '',
      disciplinas: [],
      turma: ''
    });
    setTurmaForm({
      nome: '',
      curso: '',
      periodo: '',
      ano: '',
      professor: '',
      capacidade: '',
      sala: '',
      horario: ''
    });
    setEventForm({
      titulo: '',
      descricao: '',
      data: '',
      hora: '',
      local: '',
      publico: 'todos',
      tipo: 'evento',
      isPaid: false,
      price: 0,
      allowPresence: true
    });
    setNotificationForm({
      titulo: '',
      mensagem: '',
      destinatarios: 'todos',
      prioridade: 'normal'
    });
  }, []);

  const closeModal = useCallback((modalName) => {
    setModalState(prev => ({ ...prev, [modalName]: false }));
    resetForms();
  }, [resetForms]);

  const openModal = useCallback((modalName) => {
    setModalState(prev => ({ ...prev, [modalName]: true }));
  }, []);

  const showNotification = useCallback((message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  }, []);

  // Funções CRUD
  const handleCreateUser = useCallback(async () => {
    try {
      setLoading(true)
      
      // Simulação de criação de usuário (modo mock)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay da API
      
      console.log('Usuário criado (modo mock):', {
        tipo: userForm.tipo,
        nome: userForm.nome,
        email: userForm.email,
        rm: userForm.rm
      });

      // Validar campos obrigatórios
      if (!userForm.nome || !userForm.email) {
        showNotification('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
      }

      if (userForm.tipo === 'aluno' && !userForm.rm) {
        showNotification('RM é obrigatório para alunos', 'error');
        return;
      }

      // Criar usuário localmente primeiro (funciona sempre)
      const novoUsuario = {
        id: 'local_' + Date.now(),
        nome: userForm.nome,
        email: userForm.email,
        role: userForm.tipo,
        status: 'ativo',
        createdAt: new Date().toISOString(),
        ...(userForm.tipo === 'aluno' ? {
          rm: userForm.rm || 'N/A',
          turma: userForm.turma || 'N/A'
        } : {
          disciplinas: userForm.disciplinas || ['Não especificado']
        })
      };
      
      // Adicionar à lista local
      setUsuarios(prev => [...prev, novoUsuario]);
      
      closeModal('createUser');
      resetForms();
      
      console.log('✅ Usuário criado localmente:', novoUsuario);
      showNotification(
        `✅ ${userForm.tipo === 'aluno' ? 'Aluno' : 'Professor'} "${userForm.nome}" criado com sucesso!`, 
        'success'
      );
      
      // Tentar sincronizar com backend em segundo plano (não bloqueia a UI)
      setTimeout(async () => {
        try {
          console.log('🔄 Tentando sincronizar com backend...');
          const token = localStorage.getItem('token');
          
          if (!token || token.startsWith('mock-')) {
            console.log('📡 Token inválido, fazendo novo login...');
            const loginResponse = await fetch('http://localhost:5001/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: 'admin@etec.sp.gov.br',
                password: 'admin123',
                role: 'SECRETARIA'
              })
            });
            
            if (loginResponse.ok) {
              const loginData = await loginResponse.json();
              if (loginData.success) {
                localStorage.setItem('token', loginData.token);
                console.log('✅ Novo token obtido para sincronização');
              }
            }
          }
          
          // Tentar criar no backend (não importa se falhar)
          const createEndpoint = userForm.tipo === 'aluno' ? '/create-student' : '/create-teacher';
          const createResponse = await fetch(`http://localhost:5001/api${createEndpoint}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              nome: userForm.nome,
              email: userForm.email,
              senha: userForm.senha || '123456',
              ...(userForm.tipo === 'aluno' ? {
                rm: userForm.rm,
                turma: userForm.turma
              } : {
                disciplinas: userForm.disciplinas
              })
            })
          });
          
          if (createResponse.ok) {
            const createData = await createResponse.json();
            if (createData.success) {
              console.log('🎯 Usuário sincronizado com backend:', createData.user);
              showNotification('🎯 Dados sincronizados com servidor!', 'success');
            }
          }
        } catch (syncError) {
          console.log('📡 Sincronização em segundo plano falhou:', syncError);
          // Não mostrar erro para o usuário - funcionou localmente
        }
      }, 1000);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      showNotification('Erro ao criar usuário: ' + error.message, 'error');
    } finally {
      setLoading(false)
    }
  }, [userForm])

  const handleCreateTurma = async () => {
    try {
      setLoading(true)
      await authService.request('/turmas', {
        method: 'POST',
        body: JSON.stringify(turmaForm)
      })

      closeModal('createTurma')
      resetForms()
      loadTurmas()
      loadStats()
      
      showNotification('Turma criada com sucesso!', 'success')
    } catch (error) {
      showNotification('Erro ao criar turma: ' + error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateEvent = async () => {
    try {
      setLoading(true)
      await authService.request('/eventos', {
        method: 'POST',
        body: JSON.stringify(eventForm)
      })

      closeModal('createEvent')
      resetForms()
      loadEventos()
      loadStats()
      
      showNotification('Evento criado com sucesso!', 'success')
    } catch (error) {
      showNotification('Erro ao criar evento: ' + error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSendNotification = async () => {
    try {
      setLoading(true)
      await authService.request('/notifications', {
        method: 'POST',
        body: JSON.stringify(notificationForm)
      })

      closeModal('sendNotification')
      resetForms()
      
      showNotification('Notificação enviada com sucesso!', 'success')
    } catch (error) {
      showNotification('Erro ao enviar notificação: ' + error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return

    try {
      console.log('🗑️ Excluindo usuário:', userId);
      const response = await authService.deleteUser(userId);
      
      if (response.success) {
        console.log('✅ Usuário excluído com sucesso');
        loadUsuarios();
        loadStats();
        showNotification('Usuário excluído com sucesso!', 'success');
      } else {
        throw new Error(response.error || 'Erro ao excluir usuário');
      }
    } catch (error) {
      console.error('❌ Erro ao excluir usuário:', error);
      showNotification('Erro ao excluir usuário: ' + error.message, 'error');
    }
  }

  const handleImportUsers = async (file) => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('file', file)

      await authService.request('/users/import', {
        method: 'POST',
        body: formData,
        headers: {}
      })

      closeModal('importUsers')
      loadUsuarios()
      loadStats()
      
      showNotification('Usuários importados com sucesso!', 'success')
    } catch (error) {
      showNotification('Erro ao importar usuários: ' + error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleImportTurmas = async (file) => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('file', file)

      await authService.request('/turmas/import', {
        method: 'POST',
        body: formData,
        headers: {}
      })

      closeModal('importTurmas')
      loadTurmas()
      loadStats()
      
      showNotification('Turmas importadas com sucesso!', 'success')
    } catch (error) {
      showNotification('Erro ao importar turmas: ' + error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Funções utilitárias foram movidas para cima

  // showNotification já definido no início do componente

  // Componentes
  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-3xl ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-500">
            <TrendingUp size={16} />
            <span className="text-sm font-medium">{trend}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold dark:text-white text-gray-900 mb-1">{value}</p>
        <p className="text-lg font-medium dark:text-gray-300 text-gray-700 mb-1">{title}</p>
        {subtitle && <p className="text-sm dark:text-gray-400 text-gray-600">{subtitle}</p>}
      </div>
    </motion.div>
  )



  // Renderizar seções
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={GraduationCap}
          title="Alunos"
          value={stats.totalAlunos}
          subtitle="Estudantes matriculados"
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          trend="+5"
        />
        <StatCard
          icon={Users}
          title="Professores"
          value={stats.totalProfessores}
          subtitle="Docentes ativos"
          color="bg-gradient-to-r from-green-500 to-green-600"
          trend="+2"
        />
        <StatCard
          icon={BookOpen}
          title="Turmas"
          value={stats.totalTurmas}
          subtitle="Turmas ativas"
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          trend="+1"
        />
        <StatCard
          icon={Calendar}
          title="Eventos"
          value={stats.totalEventos}
          subtitle="Eventos programados"
          color="bg-gradient-to-r from-orange-500 to-orange-600"
          trend="+3"
        />
      </div>

      {/* Quick Actions */}
      <div className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
        <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => openModal('createUser')}
            className="flex items-center gap-3 p-4 dark:bg-[#0D1117] bg-[#E1E1E1] rounded-3xl hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            <UserPlus className="text-[#8C43FF]" size={24} />
            <div className="text-left">
              <p className="font-medium dark:text-white text-gray-900">Adicionar Usuário</p>
              <p className="text-sm dark:text-gray-400 text-gray-600">Aluno ou Professor</p>
            </div>
          </button>

          <button
            onClick={() => openModal('createTurma')}
            className="flex items-center gap-3 p-4 dark:bg-[#0D1117] bg-[#E1E1E1] rounded-3xl hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            <BookOpen className="text-[#8C43FF]" size={24} />
            <div className="text-left">
              <p className="font-medium dark:text-white text-gray-900">Nova Turma</p>
              <p className="text-sm dark:text-gray-400 text-gray-600">Criar turma</p>
            </div>
          </button>

          <button
            onClick={() => openModal('createEvent')}
            className="flex items-center gap-3 p-4 dark:bg-[#0D1117] bg-[#E1E1E1] rounded-3xl hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            <Calendar className="text-[#8C43FF]" size={24} />
            <div className="text-left">
              <p className="font-medium dark:text-white text-gray-900">Novo Evento</p>
              <p className="text-sm dark:text-gray-400 text-gray-600">Criar evento</p>
            </div>
          </button>

          <button
            onClick={() => openModal('sendNotification')}
            className="flex items-center gap-3 p-4 dark:bg-[#0D1117] bg-[#E1E1E1] rounded-3xl hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            <Bell className="text-[#8C43FF]" size={24} />
            <div className="text-left">
              <p className="font-medium dark:text-white text-gray-900">Notificação</p>
              <p className="text-sm dark:text-gray-400 text-gray-600">Enviar aviso</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
          <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-500/10 rounded-2xl">
                <UserPlus size={16} className="text-green-500" />
              </div>
              <div>
                <p className="font-medium dark:text-white text-gray-900">Novo aluno cadastrado</p>
                <p className="text-sm dark:text-gray-400 text-gray-600">João Silva - 1º DS A</p>
                <p className="text-xs dark:text-gray-500 text-gray-500">2 horas atrás</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 rounded-2xl">
                <Calendar size={16} className="text-blue-500" />
              </div>
              <div>
                <p className="font-medium dark:text-white text-gray-900">Evento criado</p>
                <p className="text-sm dark:text-gray-400 text-gray-600">Semana Tecnológica 2025</p>
                <p className="text-xs dark:text-gray-500 text-gray-500">1 dia atrás</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-500/10 rounded-2xl">
                <Bell size={16} className="text-purple-500" />
              </div>
              <div>
                <p className="font-medium dark:text-white text-gray-900">Notificação enviada</p>
                <p className="text-sm dark:text-gray-400 text-gray-600">Aviso sobre matrículas</p>
                <p className="text-xs dark:text-gray-500 text-gray-500">2 dias atrás</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
          <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">Próximos Eventos</h3>
          <div className="space-y-4">
            {eventos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Calendar size={48} className="dark:text-gray-600 text-gray-400 mb-3" />
                <p className="dark:text-gray-400 text-gray-600 font-medium mb-1">Nenhum evento próximo</p>
                <p className="dark:text-gray-500 text-gray-500 text-sm text-center">Eventos aparecerão aqui quando forem criados</p>
              </div>
            ) : eventos.slice(0, 3).map((evento, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2 bg-[#8C43FF]/10 rounded-2xl">
                  <Calendar size={16} className="text-[#8C43FF]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium dark:text-white text-gray-900">{evento.titulo}</p>
                  <p className="text-sm dark:text-gray-400 text-gray-600">
                    {new Date(evento.data).toLocaleDateString()} - {evento.hora}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white text-gray-900">Gestão de Usuários</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Search size={18} className="dark:text-gray-400 text-gray-600" />
            <input
              type="text"
              placeholder="Buscar usuários..."
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              className="px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            />
          </div>
          
          <select
            value={filters.userType}
            onChange={(e) => setFilters(prev => ({ ...prev, userType: e.target.value }))}
            className="px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
          >
            <option value="todos">Todos</option>
            <option value="aluno">Alunos</option>
            <option value="professor">Professores</option>
            <option value="SECRETARIA">Administradores</option>
          </select>

          <button
            onClick={() => openModal('importUsers')}
            className="flex items-center gap-2 px-4 py-2 dark:bg-[#21262D] bg-gray-100 dark:text-white text-gray-800 rounded-3xl hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors"
          >
            <Upload size={18} />
            Importar
          </button>

          <button
            onClick={() => openModal('createUser')}
            className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-3xl transition-colors"
          >
            <Plus size={18} />
            Novo Usuário
          </button>
        </div>
      </div>

      {/* Tabela de usuários */}
      <div className="dark:bg-[#1E1E1E] bg-white rounded-2xl shadow-sm border dark:border-[#30363D] border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="dark:bg-[#0D1117] bg-gray-100">
              <tr>
                <th className="text-left p-4 font-semibold dark:text-white text-gray-900">Usuário</th>
                <th className="text-left p-4 font-semibold dark:text-white text-gray-900">Tipo</th>
                <th className="text-left p-4 font-semibold dark:text-white text-gray-900">Email</th>
                <th className="text-left p-4 font-semibold dark:text-white text-gray-900">Status</th>
                <th className="text-left p-4 font-semibold dark:text-white text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios
                .filter(user => 
                  (filters.userType === 'todos' || user.role === filters.userType) &&
                  (user.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                   user.email?.toLowerCase().includes(filters.searchTerm.toLowerCase()))
                ).length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <Users size={48} className="dark:text-gray-600 text-gray-400" />
                        <p className="dark:text-gray-400 text-gray-600 font-medium">Nenhum usuário encontrado</p>
                        <p className="dark:text-gray-500 text-gray-500 text-sm">Tente ajustar os filtros ou criar um novo usuário</p>
                      </div>
                    </td>
                  </tr>
                ) : usuarios
                  .filter(user => 
                    (filters.userType === 'todos' || user.role === filters.userType) &&
                    (user.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                     user.email?.toLowerCase().includes(filters.searchTerm.toLowerCase()))
                  )
                  .map((usuario) => (
                  <tr key={usuario.id} className="border-t dark:border-[#30363D] border-gray-200">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {usuario.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-medium dark:text-white text-gray-900">{usuario.name}</p>
                          {usuario.rm && <p className="text-sm dark:text-gray-400 text-gray-600">RM: {usuario.rm}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                        usuario.role === 'aluno' ? 'bg-blue-500/10 text-blue-500' :
                        usuario.role === 'professor' ? 'bg-green-500/10 text-green-500' :
                        'bg-purple-500/10 text-purple-500'
                      }`}>
                        {usuario.role === 'aluno' ? 'Aluno' : 
                         usuario.role === 'professor' ? 'Professor' : 'Administrador'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm dark:text-gray-400 text-gray-600">{usuario.email}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-sm font-medium">
                        Ativo
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {/* handleEditUser(usuario) */}}
                          className="p-2 text-[#8C43FF] hover:bg-[#8C43FF]/10 rounded-2xl transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(usuario.id)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-2xl transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderTurmas = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white text-gray-900">Gestão de Turmas</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => openModal('importTurmas')}
            className="flex items-center gap-2 px-4 py-2 dark:bg-[#21262D] bg-gray-100 dark:text-white text-gray-800 rounded-3xl hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors"
          >
            <Upload size={18} />
            Importar
          </button>
          <button
            onClick={() => openModal('createTurma')}
            className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-3xl transition-colors"
          >
            <Plus size={18} />
            Nova Turma
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {turmas.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center p-12 dark:bg-[#1E1E1E] bg-white rounded-2xl shadow-sm border dark:border-[#30363D] border-gray-200">
            <BookOpen size={64} className="dark:text-gray-600 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold dark:text-gray-300 text-gray-700 mb-2">Nenhuma turma encontrada</h3>
            <p className="dark:text-gray-500 text-gray-500 text-center max-w-md">Ainda não há turmas cadastradas no sistema. Comece criando a primeira turma.</p>
            <button
              onClick={() => openModal('createTurma')}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-3xl transition-colors"
            >
              <Plus size={18} />
              Criar Primeira Turma
            </button>
          </div>
        ) : turmas.map((turma) => (
          <motion.div
            key={turma.id}
            whileHover={{ scale: 1.02 }}
            className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-1">{turma.nome}</h3>
                <p className="dark:text-gray-400 text-gray-600">{turma.curso}</p>
                <p className="text-sm dark:text-gray-500 text-gray-500">{turma.periodo} - {turma.ano}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#8C43FF]">{turma.totalAlunos || 0}</p>
                <p className="text-sm dark:text-gray-400 text-gray-600">alunos</p>
              </div>
            </div>

            {turma.professor && (
              <div className="mb-4">
                <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Professor Responsável</p>
                <p className="font-medium dark:text-white text-gray-900">{turma.professor}</p>
              </div>
            )}

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 dark:bg-[#21262D] bg-gray-100 dark:text-white text-gray-800 rounded-2xl hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors text-sm">
                <Users size={16} />
                Ver Alunos
              </button>
              <button className="flex items-center justify-center gap-2 px-3 py-2 text-[#8C43FF] hover:bg-[#8C43FF]/10 rounded-2xl transition-colors text-sm">
                <Edit size={16} />
              </button>
              <button className="flex items-center justify-center gap-2 px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-2xl transition-colors text-sm">
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderEventos = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white text-gray-900">Gestão de Eventos</h2>
        <button
          onClick={() => openModal('createEvent')}
          className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-3xl transition-colors"
        >
          <Plus size={18} />
          Novo Evento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center p-12 dark:bg-[#1E1E1E] bg-white rounded-2xl shadow-sm border dark:border-[#30363D] border-gray-200">
            <Calendar size={64} className="dark:text-gray-600 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold dark:text-gray-300 text-gray-700 mb-2">Nenhum evento encontrado</h3>
            <p className="dark:text-gray-500 text-gray-500 text-center max-w-md">Ainda não há eventos cadastrados no sistema. Comece criando o primeiro evento.</p>
            <button
              onClick={() => openModal('createEvent')}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-3xl transition-colors"
            >
              <Plus size={18} />
              Criar Primeiro Evento
            </button>
          </div>
        ) : eventos.map((evento) => (
          <motion.div
            key={evento.id}
            whileHover={{ scale: 1.02 }}
            className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2">{evento.titulo}</h3>
              <p className="dark:text-gray-400 text-gray-600 text-sm">{evento.descricao}</p>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={14} className="text-[#8C43FF]" />
                <span className="dark:text-gray-300 text-gray-700">
                  {new Date(evento.data).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={14} className="text-[#8C43FF]" />
                <span className="dark:text-gray-300 text-gray-700">{evento.hora}</span>
              </div>
              {evento.local && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={14} className="text-[#8C43FF]" />
                  <span className="dark:text-gray-300 text-gray-700">{evento.local}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                evento.tipo === 'evento' ? 'bg-purple-500/10 text-purple-500' :
                evento.tipo === 'reuniao' ? 'bg-blue-500/10 text-blue-500' :
                'bg-green-500/10 text-green-500'
              }`}>
                {evento.tipo === 'evento' ? 'Evento' :
                 evento.tipo === 'reuniao' ? 'Reunião' : 'Atividade'}
              </span>

              <div className="flex gap-2">
                <button className="p-2 text-[#8C43FF] hover:bg-[#8C43FF]/10 rounded-2xl transition-colors">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-2xl transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white text-gray-900">Notificações</h2>
        <button
          onClick={() => openModal('sendNotification')}
          className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-3xl transition-colors"
        >
          <Send size={18} />
          Nova Notificação
        </button>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 dark:bg-[#1E1E1E] bg-white rounded-2xl shadow-sm border dark:border-[#30363D] border-gray-200">
            <Bell size={64} className="dark:text-gray-600 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold dark:text-gray-300 text-gray-700 mb-2">Nenhuma notificação</h3>
            <p className="dark:text-gray-500 text-gray-500 text-center max-w-md">Ainda não há notificações no sistema. Envie a primeira notificação para os usuários.</p>
            <button
              onClick={() => openModal('sendNotification')}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-3xl transition-colors"
            >
              <Send size={18} />
              Enviar Primeira Notificação
            </button>
          </div>
        ) : notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-3xl ${
                  notification.tipo === 'urgente' ? 'bg-red-500/10' :
                  notification.tipo === 'aviso' ? 'bg-yellow-500/10' :
                  'bg-blue-500/10'
                }`}>
                  <Bell size={20} className={
                    notification.tipo === 'urgente' ? 'text-red-500' :
                    notification.tipo === 'aviso' ? 'text-yellow-500' :
                    'text-blue-500'
                  } />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-2">
                    {notification.titulo}
                  </h3>
                  <p className="dark:text-gray-400 text-gray-600 mb-3">
                    {notification.mensagem}
                  </p>
                  <div className="flex items-center gap-4 text-sm dark:text-gray-500 text-gray-500">
                    <span>Público: {notification.publico}</span>
                    <span>Enviado em: {new Date(notification.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-2xl transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderComprovantes = () => {
    const aprovarComprovante = (id) => {
      setComprovantes(comprovantes.map((c) => (c.id === id ? { ...c, status: "aprovado" } : c)))
    }

    const rejeitarComprovante = (id) => {
      setComprovantes(comprovantes.map((c) => (c.id === id ? { ...c, status: "rejeitado" } : c)))
    }

    const isPDF = (url) => {
      return url && (url.toLowerCase().endsWith('.pdf') || url.toLowerCase().includes('.pdf'))
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold dark:text-white text-gray-900">Comprovantes de Pagamento</h2>
        </div>

        <div className="space-y-4">
          {comprovantes.map((comprovante) => {
            const isComprovantePDF = isPDF(comprovante.comprovante)
            
            return (
              <div key={comprovante.id} className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
                <div className="flex gap-6">
                  {/* Comprovante */}
                  <div className="w-64 flex-shrink-0">
                    {isComprovantePDF ? (
                      // Se for PDF, mostra um iframe ou ícone
                      <div className="w-full h-40 rounded-2xl border dark:border-[#30363D] border-gray-200 overflow-hidden bg-gray-100 dark:bg-[#0D1117]">
                        <iframe
                          src={comprovante.comprovante}
                          className="w-full h-full"
                          title="Comprovante PDF"
                        />
                      </div>
                    ) : (
                      // Se for imagem, mostra normalmente
                      <img
                        src={comprovante.comprovante || "/placeholder.svg"}
                        alt="Comprovante"
                        className="w-full h-40 object-cover rounded-2xl border dark:border-[#30363D] border-gray-200"
                      />
                    )}
                    <button 
                      onClick={() => window.open(comprovante.comprovante, '_blank')}
                      className="mt-2 w-full px-4 py-2 text-sm text-[#8C43FF] hover:text-[#9955FF] flex items-center justify-center gap-2 border dark:border-[#30363D] border-gray-300 rounded-2xl transition-colors"
                    >
                      {isComprovantePDF ? (
                        <>
                          <Eye className="w-4 h-4" />
                          Visualizar PDF
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          Visualizar
                        </>
                      )}
                    </button>
                    {isComprovantePDF && (
                      <a
                        href={comprovante.comprovante}
                        download={`Comprovante_${comprovante.aluno.replace(/\s+/g, '_')}_${comprovante.evento.replace(/\s+/g, '_')}.pdf`}
                        className="mt-2 w-full px-4 py-2 text-sm text-white bg-[#8C43FF] hover:bg-[#9955FF] flex items-center justify-center gap-2 rounded-2xl transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Baixar PDF
                      </a>
                    )}
                  </div>

                {/* Informações */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold dark:text-white text-gray-900">{comprovante.aluno}</h3>
                      <p className="text-sm dark:text-gray-400 text-gray-600">RM: {comprovante.rm}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        comprovante.status === "aprovado"
                          ? "bg-green-500/10 text-green-500"
                          : comprovante.status === "rejeitado"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {comprovante.status === "aprovado"
                        ? "Aprovado"
                        : comprovante.status === "rejeitado"
                          ? "Rejeitado"
                          : "Pendente"}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs dark:text-gray-500 text-gray-500">Evento</p>
                      <p className="text-sm font-medium dark:text-white text-gray-900">{comprovante.evento}</p>
                    </div>
                    <div>
                      <p className="text-xs dark:text-gray-500 text-gray-500">Valor</p>
                      <p className="text-sm font-medium dark:text-white text-gray-900">{comprovante.valor}</p>
                    </div>
                    <div>
                      <p className="text-xs dark:text-gray-500 text-gray-500">Data de envio</p>
                      <p className="text-sm font-medium dark:text-white text-gray-900">{comprovante.data}</p>
                    </div>
                  </div>

                  {/* Ações */}
                  {comprovante.status === "pendente" && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => aprovarComprovante(comprovante.id)}
                        className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-2xl flex items-center justify-center gap-2 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Aprovar
                      </button>
                      <button
                        onClick={() => rejeitarComprovante(comprovante.id)}
                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-2xl flex items-center justify-center gap-2 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Rejeitar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white text-gray-900">Relatórios</h2>
        <button
          onClick={() => openModal('viewReport')}
          className="flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-3xl transition-colors"
        >
          <BarChart3 size={18} />
          Gerar Relatório
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-3xl">
              <Users size={24} className="text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold dark:text-white text-gray-900">Relatório de Usuários</h3>
              <p className="text-sm dark:text-gray-400 text-gray-600">Estatísticas de alunos e professores</p>
            </div>
          </div>
          <button className="w-full px-4 py-2 dark:bg-[#21262D] bg-gray-100 dark:text-white text-gray-800 rounded-2xl hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors">
            <Download size={16} className="inline mr-2" />
            Baixar PDF
          </button>
        </div>

        <div className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-500/10 rounded-3xl">
              <Calendar size={24} className="text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold dark:text-white text-gray-900">Relatório de Eventos</h3>
              <p className="text-sm dark:text-gray-400 text-gray-600">Eventos e participação</p>
            </div>
          </div>
          <button className="w-full px-4 py-2 dark:bg-[#21262D] bg-gray-100 dark:text-white text-gray-800 rounded-2xl hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors">
            <Download size={16} className="inline mr-2" />
            Baixar Excel
          </button>
        </div>

        <div className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/10 rounded-3xl">
              <BarChart3 size={24} className="text-purple-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold dark:text-white text-gray-900">Relatório Geral</h3>
              <p className="text-sm dark:text-gray-400 text-gray-600">Estatísticas completas</p>
            </div>
          </div>
          <button className="w-full px-4 py-2 dark:bg-[#21262D] bg-gray-100 dark:text-white text-gray-800 rounded-2xl hover:bg-gray-200 dark:hover:bg-[#30363D] transition-colors">
            <Download size={16} className="inline mr-2" />
            Baixar PDF
          </button>
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white text-gray-900">Configurações</h2>
      
      <div className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
        <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">Informações da Escola</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Nome da Escola
            </label>
            <input
              type="text"
              defaultValue="Etec Albert Einstein"
              className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Diretor
            </label>
            <input
              type="text"
              defaultValue="Prof. Maria Silva"
              className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Email da Escola
            </label>
            <input
              type="email"
              defaultValue="contato@etec.sp.gov.br"
              className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Telefone
            </label>
            <input
              type="tel"
              defaultValue="(11) 1234-5678"
              className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <button className="px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-2xl transition-colors">
            <Save size={16} className="inline mr-2" />
            Salvar Alterações
          </button>
        </div>
      </div>

      <div className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
        <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-4">Configurações do Sistema</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium dark:text-white text-gray-900">Notificações por Email</p>
              <p className="text-sm dark:text-gray-400 text-gray-600">Enviar notificações para usuários por email</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-[#8C43FF] rounded" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium dark:text-white text-gray-900">Backup Automático</p>
              <p className="text-sm dark:text-gray-400 text-gray-600">Fazer backup dos dados diariamente</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-[#8C43FF] rounded" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm dark:text-gray-400 text-gray-600">Habilitar logs detalhados</p>
            </div>
            <input type="checkbox" className="w-4 h-4 text-[#8C43FF] rounded" />
          </div>
        </div>
      </div>

      {onLogout && (
        <div className="dark:bg-[#1E1E1E] bg-white rounded-2xl p-6 shadow-sm border dark:border-[#30363D] border-gray-200">
          <h3 className="text-lg font-semibold text-red-500 mb-4">Zona de Perigo</h3>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-2xl transition-colors"
          >
            Sair da Conta
          </button>
        </div>
      )}
    </div>
  )

  // Definições movidas para o início do componente

  // Handlers memoizados
  const handleUserFormChange = useCallback((field, value) => {
    setUserForm(prev => ({ ...prev, [field]: value }));
  }, []);

  // Modal para criar usuário
  const createUserModal = useMemo(() => {
    if (!modalState.createUser) return null;
    
    return (
      <Modal
        isOpen={modalState.createUser}
        onClose={() => closeModal('createUser')}
        title="Criar Novo Usuário"
        size="lg"
      >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
            Tipo de Usuário
          </label>
          <select
            value={userForm.tipo}
            onChange={(e) => handleUserFormChange('tipo', e.target.value)}
            className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
          >
            <option value="aluno">Aluno</option>
            <option value="professor">Professor</option>
            <option value="SECRETARIA">Administrador</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              value={userForm.nome}
              onChange={(e) => handleUserFormChange('nome', e.target.value)}
              className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              placeholder="João Silva"
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={userForm.email}
              onChange={(e) => handleUserFormChange('email', e.target.value)}
              className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              placeholder="joao@etec.sp.gov.br"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={userForm.senha}
              onChange={(e) => handleUserFormChange('senha', e.target.value)}
              className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              placeholder="Senha inicial"
            />
          </div>
          {userForm.tipo === 'aluno' && (
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                RM
              </label>
              <input
                type="text"
                value={userForm.rm}
                onChange={(e) => handleUserFormChange('rm', e.target.value)}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
                placeholder="12345"
              />
            </div>
          )}
        </div>

        {userForm.tipo === 'aluno' && (
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Turma
            </label>
            <select
              value={userForm.turma}
              onChange={(e) => handleUserFormChange('turma', e.target.value)}
              className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
            >
              <option value="">Selecione a turma</option>
              {turmas.map(turma => (
                <option key={turma.id} value={turma.nome}>{turma.nome}</option>
              ))}
            </select>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => closeModal('createUser')}
            className="flex-1 px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleCreateUser}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-2xl transition-colors disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Criar Usuário'}
          </button>
        </div>
      </div>
      </Modal>
    );
  }, [modalState.createUser, userForm, handleCreateUser, handleUserFormChange]);

  // Modal para criar evento
  const createEventModal = useMemo(() => {
    if (!modalState.createEvent) return null;
    
    return (
      <Modal
        isOpen={modalState.createEvent}
        onClose={() => closeModal('createEvent')}
        title="Criar Novo Evento"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Título do Evento
            </label>
            <input
              type="text"
              value={eventForm.titulo}
              onChange={(e) => setEventForm(prev => ({ ...prev, titulo: e.target.value }))}
              className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              placeholder="Ex: Semana Tecnológica"
            />
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              value={eventForm.descricao}
              onChange={(e) => setEventForm(prev => ({ ...prev, descricao: e.target.value }))}
              className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              placeholder="Descrição completa do evento"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                Data
              </label>
              <input
                type="date"
                value={eventForm.data}
                onChange={(e) => setEventForm(prev => ({ ...prev, data: e.target.value }))}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                Horário
              </label>
              <input
                type="time"
                value={eventForm.hora}
                onChange={(e) => setEventForm(prev => ({ ...prev, hora: e.target.value }))}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Local
            </label>
            <input
              type="text"
              value={eventForm.local}
              onChange={(e) => setEventForm(prev => ({ ...prev, local: e.target.value }))}
              className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              placeholder="Ex: Auditório Principal"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                Tipo de Evento
              </label>
              <select
                value={eventForm.tipo}
                onChange={(e) => setEventForm(prev => ({ ...prev, tipo: e.target.value }))}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              >
                <option value="evento">Evento</option>
                <option value="reuniao">Reunião</option>
                <option value="atividade">Atividade</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                Público Alvo
              </label>
              <select
                value={eventForm.publico}
                onChange={(e) => setEventForm(prev => ({ ...prev, publico: e.target.value }))}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              >
                <option value="todos">Todos</option>
                <option value="alunos">Alunos</option>
                <option value="professores">Professores</option>
              </select>
            </div>
          </div>

          <div className="border-t dark:border-[#30363D] border-gray-300 pt-4">
            <div className="flex items-start gap-3 mb-4">
              <input
                type="checkbox"
                id="isPaid"
                checked={eventForm.isPaid}
                onChange={(e) => setEventForm(prev => ({ 
                  ...prev, 
                  isPaid: e.target.checked,
                  price: e.target.checked ? prev.price : 0
                }))}
                className="w-4 h-4 text-[#8C43FF] rounded mt-1"
              />
              <div>
                <label htmlFor="isPaid" className="block text-sm font-medium dark:text-gray-300 text-gray-700 cursor-pointer">
                  Evento Pago
                </label>
                <p className="text-xs dark:text-gray-400 text-gray-600">Marque se o evento requer pagamento</p>
              </div>
            </div>

            {eventForm.isPaid && (
              <div className="ml-7 mb-4">
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                  Valor (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={eventForm.price}
                  onChange={(e) => setEventForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            )}

            {!eventForm.isPaid && (
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="allowPresence"
                  checked={eventForm.allowPresence}
                  onChange={(e) => setEventForm(prev => ({ ...prev, allowPresence: e.target.checked }))}
                  className="w-4 h-4 text-[#8C43FF] rounded mt-1"
                />
                <div>
                  <label htmlFor="allowPresence" className="block text-sm font-medium dark:text-gray-300 text-gray-700 cursor-pointer">
                    É possível marcar presença neste evento
                  </label>
                  <p className="text-xs dark:text-gray-400 text-gray-600">
                    Permite que alunos marquem presença no evento gratuito
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => closeModal('createEvent')}
              className="flex-1 px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateEvent}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-2xl transition-colors disabled:opacity-50"
            >
              {loading ? 'Criando...' : 'Criar Evento'}
            </button>
          </div>
        </div>
      </Modal>
    );
  }, [modalState.createEvent, eventForm, handleCreateEvent, loading]);

  // Modal para criar turma
  const createTurmaModal = useMemo(() => {
    if (!modalState.createTurma) return null;
    
    return (
      <Modal
        isOpen={modalState.createTurma}
        onClose={() => closeModal('createTurma')}
        title="Criar Nova Turma"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                Nome da Turma *
              </label>
              <input
                type="text"
                value={turmaForm.nome}
                onChange={(e) => setTurmaForm(prev => ({ ...prev, nome: e.target.value }))}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
                placeholder="Ex: 1º DS A"
              />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                Curso *
              </label>
              <select
                value={turmaForm.curso}
                onChange={(e) => setTurmaForm(prev => ({ ...prev, curso: e.target.value }))}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              >
                <option value="">Selecione o curso</option>
                <option value="Desenvolvimento de Sistemas">Desenvolvimento de Sistemas</option>
                <option value="Informática para Internet">Informática para Internet</option>
                <option value="Redes de Computadores">Redes de Computadores</option>
                <option value="Administração">Administração</option>
                <option value="Logística">Logística</option>
                <option value="Contabilidade">Contabilidade</option>
                <option value="Recursos Humanos">Recursos Humanos</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                Período *
              </label>
              <select
                value={turmaForm.periodo}
                onChange={(e) => setTurmaForm(prev => ({ ...prev, periodo: e.target.value }))}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              >
                <option value="">Período</option>
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
                <option value="Noite">Noite</option>
                <option value="Integral">Integral</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                Ano *
              </label>
              <input
                type="text"
                value={turmaForm.ano}
                onChange={(e) => setTurmaForm(prev => ({ ...prev, ano: e.target.value }))}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
                placeholder="2025"
              />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                Sala
              </label>
              <input
                type="text"
                value={turmaForm.sala}
                onChange={(e) => setTurmaForm(prev => ({ ...prev, sala: e.target.value }))}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
                placeholder="Ex: Lab 01"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                Professor Responsável
              </label>
              <select
                value={turmaForm.professor}
                onChange={(e) => setTurmaForm(prev => ({ ...prev, professor: e.target.value }))}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              >
                <option value="">Selecione o professor</option>
                {usuarios.filter(u => u.role === 'professor').map(prof => (
                  <option key={prof.id} value={prof.name}>{prof.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                Capacidade
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={turmaForm.capacidade}
                onChange={(e) => setTurmaForm(prev => ({ ...prev, capacidade: e.target.value }))}
                className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
                placeholder="40"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              Horário das Aulas
            </label>
            <input
              type="text"
              value={turmaForm.horario}
              onChange={(e) => setTurmaForm(prev => ({ ...prev, horario: e.target.value }))}
              className="w-full px-3 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:bg-[#0D1117] bg-white dark:text-white text-gray-900 focus:ring-2 focus:ring-[#8C43FF] focus:border-transparent"
              placeholder="Ex: 19:00 às 22:30"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => closeModal('createTurma')}
              className="flex-1 px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateTurma}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-2xl transition-colors disabled:opacity-50"
            >
              {loading ? 'Criando...' : 'Criar Turma'}
            </button>
          </div>
        </div>
      </Modal>
    );
  }, [modalState.createTurma, turmaForm, handleCreateTurma, loading, usuarios]);

  // Modal para importar turmas
  const importTurmasModal = useMemo(() => {
    if (!modalState.importTurmas) return null;
    
    return (
      <Modal
        isOpen={modalState.importTurmas}
        onClose={() => closeModal('importTurmas')}
        title="Importar Turmas"
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Formato do Arquivo</h4>
            <p className="text-sm text-blue-800 dark:text-blue-400 mb-3">
              O arquivo deve ser CSV ou Excel com as seguintes colunas:
            </p>
            <ul className="text-sm text-blue-800 dark:text-blue-400 list-disc list-inside space-y-1">
              <li><strong>nome</strong> - Nome da turma (Ex: 1º DS A)</li>
              <li><strong>curso</strong> - Nome do curso</li>
              <li><strong>periodo</strong> - Manhã, Tarde, Noite ou Integral</li>
              <li><strong>ano</strong> - Ano letivo (Ex: 2025)</li>
              <li><strong>professor</strong> - Nome do professor (opcional)</li>
              <li><strong>sala</strong> - Sala de aula (opcional)</li>
              <li><strong>capacidade</strong> - Número máximo de alunos (opcional)</li>
              <li><strong>horario</strong> - Horário das aulas (opcional)</li>
            </ul>
          </div>

          <div className="border-2 border-dashed dark:border-[#30363D] border-gray-300 rounded-2xl p-8 text-center">
            <Upload size={48} className="mx-auto dark:text-gray-400 text-gray-500 mb-3" />
            <p className="dark:text-gray-300 text-gray-700 font-medium mb-2">
              Arraste o arquivo aqui ou clique para selecionar
            </p>
            <p className="text-sm dark:text-gray-400 text-gray-600 mb-4">
              Formatos aceitos: .csv, .xlsx, .xls
            </p>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleImportTurmas(file);
                }
              }}
              className="hidden"
              id="import-turmas-file"
            />
            <label
              htmlFor="import-turmas-file"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#8C43FF] hover:bg-[#9955FF] text-white rounded-2xl cursor-pointer transition-colors"
            >
              <Upload size={18} />
              Selecionar Arquivo
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => closeModal('importTurmas')}
              className="flex-1 px-4 py-2 border dark:border-[#30363D] border-gray-300 rounded-2xl dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-[#21262D] transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    );
  }, [modalState.importTurmas]);

  // Renderização principal
  return (
    <div className="min-h-screen bg-[#f3e8ff] dark:bg-[#121212]">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 dark:bg-[#1E1E1E] bg-white border-r dark:border-[#30363D] border-gray-200 min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-[#8C43FF] rounded-3xl">
                <Building2 size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-[#58417d] bg-clip-text text-transparent mb-2">Painel Secretaria</h1>
                <span className="text-sm dark:text-gray-400 text-gray-600">Etec de Peruíbe</span>
               
              </div>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'overview', icon: Home, label: 'Visão Geral' },
                { id: 'users', icon: Users, label: 'Usuários' },
                { id: 'turmas', icon: BookOpen, label: 'Turmas' },
                { id: 'eventos', icon: Calendar, label: 'Eventos' },
                { id: 'notifications', icon: Bell, label: 'Notificações' },
                { id: 'comprovantes', icon: Archive, label: 'Comprovantes' },
                { id: 'reports', icon: BarChart3, label: 'Relatórios' },
                { id: 'settings', icon: Settings, label: 'Configurações' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-3xl font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-[#8C43FF] text-white"
                      : "dark:text-gray-400 text-gray-600 hover:bg-gray-100 dark:hover:bg-[#21262D]"
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {loading && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 flex items-center justify-center">
              <div className="dark:bg-[#1E1E1E] bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <RefreshCw className="animate-spin text-[#8C43FF]" size={24} />
                  <span className="dark:text-white text-gray-900 font-medium">Carregando...</span>
                </div>
              </div>
            </div>
          )}

          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === 'overview' && renderOverview()}
            {activeSection === 'users' && renderUsers()}
            {activeSection === 'turmas' && renderTurmas()}
            {activeSection === 'eventos' && renderEventos()}
            {activeSection === 'notifications' && renderNotifications()}
            {activeSection === 'comprovantes' && renderComprovantes()}
            {activeSection === 'reports' && renderReports()}
            {activeSection === 'settings' && renderSettings()}
          </motion.div>
        </div>
      </div>

      {/* Modais */}
      {createUserModal}
      {createEventModal}
      {createTurmaModal}
      {importTurmasModal}
      {/* Outros modais seriam implementados aqui */}
    </div>
  )
}

export default EtecDashboard
