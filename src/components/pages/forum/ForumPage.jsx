"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../../hooks/useAuth"
import { db } from "../../../config/firebase"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import ForumSidebar from "./ForumSidebar"
import ForumChatArea from "./ForumChatArea"
import ForumMembersSidebar from "./ForumMembersSidebar"
import Loading from "../../ui/Loading"

const ForumPage = () => {
  const { user, loading: authLoading } = useAuth()
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Buscar cursos disponíveis do Firebase
  useEffect(() => {
    // 🔍 DEBUG: Verificar autenticação COMPLETA
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🔐 ForumPage - Verificação de Auth')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('Usuário existe?', !!user)
    console.log('Email:', user?.email)
    console.log('UID:', user?.uid)
    console.log('DisplayName:', user?.displayName)
    console.log('Auth Loading?', authLoading)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    
    if (!user) {
      console.warn('⚠️ Usuário não autenticado! Aguardando login...')
      setLoading(false)
      return
    }

    console.log('📚 ForumPage - Buscando cursos do Firebase...')
    console.log('📚 Firebase Auth UID:', user.uid)
    
    const coursesRef = collection(db, "courses")
    const q = query(coursesRef, orderBy("name", "asc"))

    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        const coursesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        
        console.log('✅ Cursos carregados:', coursesData.length, coursesData)
        setCourses(coursesData)
      
        // Selecionar primeiro curso automaticamente
        if (coursesData.length > 0 && !selectedCourse) {
          setSelectedCourse(coursesData[0])
        }
        
        setLoading(false)
      },
      (error) => {
        console.error('❌ Erro ao buscar cursos:', error)
        console.error('❌ Código do erro:', error.code)
        console.error('❌ Mensagem:', error.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [user])

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f3e8ff] dark:bg-[#121212]">
        <Loading />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f3e8ff] dark:bg-[#121212]">
        <div className="text-center">
          <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">
            Acesso Restrito
          </h2>
          <p className="dark:text-gray-400 text-gray-600">
            Você precisa estar logado para acessar o fórum.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#f3e8ff] dark:bg-[#121212] overflow-hidden">
      {/* Sidebar Esquerda - Cursos */}
      <ForumSidebar
        courses={courses}
        selectedCourse={selectedCourse}
        onSelectCourse={setSelectedCourse}
        currentUser={user}
      />

      {/* Área Central - Chat */}
      <ForumChatArea
        course={selectedCourse}
        currentUser={user}
        onProfileClick={setSelectedProfile}
      />

      {/* Sidebar Direita - Membros */}
      <ForumMembersSidebar
        courseId={selectedCourse?.id}
        selectedProfile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
        onProfileClick={setSelectedProfile}
      />
    </div>
  )
}

export default ForumPage
