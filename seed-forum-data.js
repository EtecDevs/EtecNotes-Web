/**
 * 🌱 SCRIPT DE SEED - POPULAR DADOS DO FÓRUM
 * 
 * Execute APENAS UMA VEZ para criar as coleções courses e messages
 * 
 * Como usar:
 * 1. Certifique-se de que o Firebase está configurado em src/config/firebase.js
 * 2. Rode: node seed-forum-data.js
 * 3. Aguarde a confirmação de sucesso
 * 4. Nunca rode novamente (ou vai duplicar cursos)
 */

import { initializeApp } from 'firebase/app'
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore'

// ✅ Credenciais do Firebase EtecNotes
const firebaseConfig = {
  apiKey: "AIzaSyBTwYLOnCJAEqDAxxJGn_Yb1XnD0u1XWl0",
  authDomain: "etecnotes.firebaseapp.com",
  projectId: "etecnotes",
  storageBucket: "etecnotes.firebasestorage.app",
  messagingSenderId: "268058028102",
  appId: "1:268058028102:web:4d953d3a48b7f2e6dff8bf",
  measurementId: "G-GNHEMZSM1L"
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// 📚 Dados dos cursos da Etec
const courses = [
  {
    id: "ds",
    name: "Desenvolvimento de Sistemas",
    description: "Discussões sobre programação, banco de dados e desenvolvimento web",
    icon: "💻",
    color: "#8C43FF",
    memberCount: 0
  },
  {
    id: "adm",
    name: "Administração",
    description: "Tópicos sobre gestão, empreendedorismo e negócios",
    icon: "📊",
    color: "#FF6B6B",
    memberCount: 0
  },
  {
    id: "rh",
    name: "Recursos Humanos",
    description: "Discussões sobre gestão de pessoas e departamento pessoal",
    icon: "👥",
    color: "#4ECDC4",
    memberCount: 0
  },
  {
    id: "info",
    name: "Informática para Internet",
    description: "Web design, front-end, back-end e tecnologias web",
    icon: "🌐",
    color: "#95E1D3",
    memberCount: 0
  },
  {
    id: "log",
    name: "Logística",
    description: "Cadeia de suprimentos, transporte e armazenagem",
    icon: "📦",
    color: "#F38181",
    memberCount: 0
  },
  {
    id: "contabilidade",
    name: "Contabilidade",
    description: "Balanços, demonstrativos e legislação contábil",
    icon: "💰",
    color: "#FFD93D",
    memberCount: 0
  },
  {
    id: "enfermagem",
    name: "Enfermagem",
    description: "Saúde, cuidados e práticas de enfermagem",
    icon: "🏥",
    color: "#6BCB77",
    memberCount: 0
  },
  {
    id: "mecanica",
    name: "Mecânica",
    description: "Projetos, manutenção e tecnologia mecânica",
    icon: "⚙️",
    color: "#A8E6CF",
    memberCount: 0
  }
]

// 💬 Mensagens de boas-vindas para cada curso
const welcomeMessages = [
  {
    courseId: "ds",
    content: "🚀 Bem-vindos ao Fórum de Desenvolvimento de Sistemas! Compartilhem códigos, tirem dúvidas e aprendam juntos!",
    userName: "Sistema EtecNotes",
    userEmail: "sistema@etecnotes.com"
  },
  {
    courseId: "adm",
    content: "📊 Fórum de Administração aberto! Vamos discutir empreendedorismo, gestão e inovação!",
    userName: "Sistema EtecNotes",
    userEmail: "sistema@etecnotes.com"
  },
  {
    courseId: "rh",
    content: "👥 Espaço para discutir gestão de pessoas, recrutamento e desenvolvimento humano!",
    userName: "Sistema EtecNotes",
    userEmail: "sistema@etecnotes.com"
  },
  {
    courseId: "info",
    content: "🌐 Fórum de Informática para Internet! Compartilhem projetos web e tecnologias!",
    userName: "Sistema EtecNotes",
    userEmail: "sistema@etecnotes.com"
  },
  {
    courseId: "log",
    content: "📦 Espaço para discutir logística, supply chain e otimização de processos!",
    userName: "Sistema EtecNotes",
    userEmail: "sistema@etecnotes.com"
  },
  {
    courseId: "contabilidade",
    content: "💰 Fórum de Contabilidade! Vamos debater legislação, balanços e práticas contábeis!",
    userName: "Sistema EtecNotes",
    userEmail: "sistema@etecnotes.com"
  },
  {
    courseId: "enfermagem",
    content: "🏥 Espaço dedicado a estudantes de enfermagem! Compartilhem experiências e conhecimento!",
    userName: "Sistema EtecNotes",
    userEmail: "sistema@etecnotes.com"
  },
  {
    courseId: "mecanica",
    content: "⚙️ Fórum de Mecânica! Discutam projetos, manutenção e inovações tecnológicas!",
    userName: "Sistema EtecNotes",
    userEmail: "sistema@etecnotes.com"
  }
]

// 🎯 Função principal de seed
async function seedForumData() {
  try {
    console.log('🌱 Iniciando seed do banco de dados do Fórum...\n')

    // 1️⃣ Criar cursos
    console.log('📚 Criando cursos...')
    for (const course of courses) {
      const courseRef = doc(db, 'courses', course.id)
      await setDoc(courseRef, {
        ...course,
        createdAt: serverTimestamp()
      })
      console.log(`✅ Curso criado: ${course.name}`)
    }
    console.log(`\n✨ ${courses.length} cursos criados com sucesso!\n`)

    // 2️⃣ Criar mensagens de boas-vindas
    console.log('💬 Criando mensagens de boas-vindas...')
    for (const message of welcomeMessages) {
      const messageRef = doc(collection(db, 'messages'))
      await setDoc(messageRef, {
        ...message,
        userId: "SYSTEM", // ID especial para mensagens do sistema
        userAvatar: null,
        reactions: [],
        createdAt: serverTimestamp()
      })
      console.log(`✅ Mensagem criada para: ${message.courseId}`)
    }
    console.log(`\n✨ ${welcomeMessages.length} mensagens criadas com sucesso!\n`)

    // 3️⃣ Resumo
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🎉 SEED CONCLUÍDO COM SUCESSO!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`📊 Coleções criadas:`)
    console.log(`   • courses: ${courses.length} documentos`)
    console.log(`   • messages: ${welcomeMessages.length} documentos`)
    console.log(`\n✅ Agora você pode acessar o Fórum no EtecNotes!`)
    console.log(`\n⚠️  NÃO execute este script novamente (vai duplicar dados)`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    process.exit(0)
  } catch (error) {
    console.error('❌ Erro durante o seed:', error)
    console.error('\n🔍 Possíveis causas:')
    console.error('   1. Credenciais do Firebase incorretas')
    console.error('   2. Regras de segurança do Firestore muito restritivas')
    console.error('   3. Projeto Firebase não inicializado')
    console.error('\n💡 Solução: Verifique src/config/firebase.js e tente novamente')
    process.exit(1)
  }
}

// 🚀 Executar seed
seedForumData()
