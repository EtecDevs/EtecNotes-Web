/**
 * 🔄 SCRIPT PARA ATUALIZAR ÍCONES DOS CURSOS (Admin SDK)
 * 
 * Este script atualiza os cursos existentes no Firestore
 * adicionando os ícones (emojis) caso não existam
 * 
 * Como usar:
 * 1. Rode: node update-course-icons-admin.js
 * 2. Aguarde a confirmação de sucesso
 * 3. Recarregue a página do fórum
 */

import admin from 'firebase-admin'
import { readFileSync } from 'fs'

// Carregar credenciais do admin
const serviceAccount = JSON.parse(
  readFileSync('./etecnotes-firebase-adminsdk.json', 'utf8')
)

// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

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
        const courseRef = db.collection('courses').doc(courseId)
        
        // Verificar se o curso existe
        const courseSnap = await courseRef.get()
        
        if (!courseSnap.exists) {
          console.log(`⚠️  Curso ${courseId} não existe - IGNORANDO`)
          skippedCount++
          continue
        }

        const currentData = courseSnap.data()
        
        // Verificar se já tem ícone
        if (currentData.icon) {
          console.log(`✅ Curso ${courseSnap.id} (${currentData.name}) já tem ícone: ${currentData.icon} - IGNORANDO`)
          skippedCount++
          continue
        }

        // Atualizar com o ícone
        await courseRef.update({
          icon: data.icon,
          color: data.color
        })

        console.log(`✅ Atualizado: ${currentData.name} -> ${data.icon}`)
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
    
    if (updatedCount > 0) {
      console.log(`\n✨ Recarregue a página do Fórum para ver os ícones!`)
    } else if (skippedCount > 0) {
      console.log(`\n✅ Todos os cursos já têm ícones!`)
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    process.exit(0)
  } catch (error) {
    console.error('❌ Erro durante a atualização:', error)
    console.error('\n🔍 Possíveis causas:')
    console.error('   1. Arquivo etecnotes-firebase-adminsdk.json não encontrado ou inválido')
    console.error('   2. Cursos não foram criados ainda')
    console.error('   3. Problemas de conexão com o Firestore')
    console.error('\n💡 Solução:')
    console.error('   1. Verifique se o arquivo etecnotes-firebase-adminsdk.json existe')
    console.error('   2. Execute: node seed-forum-data.js (se ainda não executou)')
    console.error('   3. Gere uma nova chave Admin SDK no Firebase Console')
    process.exit(1)
  }
}

// 🚀 Executar atualização
console.log('🎨 Script de Atualização de Ícones dos Cursos (Admin SDK)')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
updateCourseIcons()
