/**
 * 🔄 SCRIPT PARA ATUALIZAR ÍCONES DOS CURSOS
 * 
 * Este script atualiza os cursos existentes no Firestore
 * adicionando os ícones (emojis) caso não existam
 * 
 * Como usar:
 * 1. Rode: node update-course-icons.js
 * 2. Aguarde a confirmação de sucesso
 * 3. Recarregue a página do fórum
 */

import { initializeApp } from 'firebase/app'
import { 
  getFirestore, 
  doc, 
  updateDoc, 
  getDoc
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

// 📚 Mapeamento de ícones por ID do curso
const courseIcons = {
  "ds": {
    icon: "💻",
    color: "#8C43FF"
  },
  "adm": {
    icon: "📊",
    color: "#FF6B6B"
  },
  "rh": {
    icon: "👥",
    color: "#4ECDC4"
  },
  "info": {
    icon: "🌐",
    color: "#95E1D3"
  },
  "log": {
    icon: "📦",
    color: "#F38181"
  },
  "contabilidade": {
    icon: "💰",
    color: "#FFD93D"
  },
  "enfermagem": {
    icon: "🏥",
    color: "#6BCB77"
  },
  "mecanica": {
    icon: "⚙️",
    color: "#A8E6CF"
  }
}

// 🎯 Função para atualizar ícones
async function updateCourseIcons() {
  try {
    console.log('🔄 Iniciando atualização de ícones dos cursos...\n')

    let updatedCount = 0
    let skippedCount = 0
    let errorCount = 0

    for (const [courseId, data] of Object.entries(courseIcons)) {
      try {
        const courseRef = doc(db, 'courses', courseId)
        
        // Verificar se o curso existe
        const courseSnap = await getDoc(courseRef)
        
        if (!courseSnap.exists()) {
          console.log(`⚠️  Curso ${courseId} não existe - IGNORANDO`)
          skippedCount++
          continue
        }

        const currentData = courseSnap.data()
        
        // Verificar se já tem ícone
        if (currentData.icon) {
          console.log(`✅ Curso ${courseId} já tem ícone: ${currentData.icon} - IGNORANDO`)
          skippedCount++
          continue
        }

        // Atualizar com o ícone
        await updateDoc(courseRef, {
          icon: data.icon,
          color: data.color
        })

        console.log(`✅ Atualizado: ${courseId} -> ${data.icon}`)
        updatedCount++
        
      } catch (error) {
        console.error(`❌ Erro ao atualizar ${courseId}:`, error.message)
        errorCount++
      }
    }

    // Resumo
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🎉 ATUALIZAÇÃO CONCLUÍDA!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`📊 Estatísticas:`)
    console.log(`   ✅ Cursos atualizados: ${updatedCount}`)
    console.log(`   ⚠️  Cursos ignorados: ${skippedCount}`)
    console.log(`   ❌ Erros: ${errorCount}`)
    console.log(`\n✨ Recarregue a página do Fórum para ver os ícones!`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    process.exit(0)
  } catch (error) {
    console.error('❌ Erro durante a atualização:', error)
    console.error('\n🔍 Possíveis causas:')
    console.error('   1. Credenciais do Firebase incorretas')
    console.error('   2. Regras de segurança do Firestore muito restritivas')
    console.error('   3. Cursos não foram criados ainda')
    console.error('\n💡 Solução:')
    console.error('   1. Verifique se os cursos existem no Firestore')
    console.error('   2. Execute: node seed-forum-data.js (se ainda não executou)')
    console.error('   3. Verifique as permissões do Firestore')
    process.exit(1)
  }
}

// 🚀 Executar atualização
console.log('🎨 Script de Atualização de Ícones dos Cursos')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
updateCourseIcons()
