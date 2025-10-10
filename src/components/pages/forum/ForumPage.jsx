"use client"

import { useState, useEffect, useRef } from "react"
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
  
  // Estados para redimensionamento das sidebars
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(280) // Largura inicial
  const [rightSidebarWidth, setRightSidebarWidth] = useState(300)
  const [isResizingLeft, setIsResizingLeft] = useState(false)
  const [isResizingRight, setIsResizingRight] = useState(false)
  
  const leftResizeRef = useRef(null)
  const rightResizeRef = useRef(null)

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

  // Funcionalidade de redimensionamento da sidebar esquerda
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizingLeft) {
        const newWidth = e.clientX
        if (newWidth >= 200 && newWidth <= 500) {
          setLeftSidebarWidth(newWidth)
        }
      }
      if (isResizingRight) {
        const newWidth = window.innerWidth - e.clientX
        if (newWidth >= 250 && newWidth <= 600) {
          setRightSidebarWidth(newWidth)
        }
      }
    }

    const handleMouseUp = () => {
      setIsResizingLeft(false)
      setIsResizingRight(false)
    }

    if (isResizingLeft || isResizingRight) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'ew-resize'
      document.body.style.userSelect = 'none'
    } else {
      document.body.style.cursor = 'auto'
      document.body.style.userSelect = 'auto'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizingLeft, isResizingRight])

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
    <div className="flex h-screen bg-gradient-to-br from-[#f3e8ff] via-[#e8d5ff] to-[#f3e8ff] dark:from-[#0a0a0a] dark:via-[#121212] dark:to-[#0a0a0a] overflow-hidden">
      {/* Sidebar Esquerda - Cursos com redimensionamento */}
      <div 
        className="relative flex-shrink-0 transition-all duration-200"
        style={{ width: `${leftSidebarWidth}px` }}
      >
        <ForumSidebar
          courses={courses}
          selectedCourse={selectedCourse}
          onSelectCourse={setSelectedCourse}
          currentUser={user}
        />
        
        {/* Handle de redimensionamento */}
        <div
          ref={leftResizeRef}
          className="absolute top-0 right-0 w-1 h-full cursor-ew-resize hover:bg-[#8C43FF] transition-colors duration-200 z-10 group"
          onMouseDown={() => setIsResizingLeft(true)}
        >
          <div className="absolute inset-y-0 -right-1 w-3 group-hover:bg-[#8C43FF]/20" />
        </div>
      </div>

      {/* Área Central - Chat */}
      <div className="flex-1 min-w-0">
        <ForumChatArea
          course={selectedCourse}
          currentUser={user}
          onProfileClick={setSelectedProfile}
        />
      </div>

      {/* Sidebar Direita - Membros com redimensionamento */}
      <div 
        className="relative flex-shrink-0 transition-all duration-200"
        style={{ width: `${rightSidebarWidth}px` }}
      >
        {/* Handle de redimensionamento */}
        <div
          ref={rightResizeRef}
          className="absolute top-0 left-0 w-1 h-full cursor-ew-resize hover:bg-[#8C43FF] transition-colors duration-200 z-10 group"
          onMouseDown={() => setIsResizingRight(true)}
        >
          <div className="absolute inset-y-0 -left-1 w-3 group-hover:bg-[#8C43FF]/20" />
        </div>
        
        <ForumMembersSidebar
          courseId={selectedCourse?.id}
          selectedProfile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          onProfileClick={setSelectedProfile}
        />
      </div>
    </div>
  )
}

export default ForumPage
