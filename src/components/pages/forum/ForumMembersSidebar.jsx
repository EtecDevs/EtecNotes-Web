"use client"

import { useState, useEffect } from "react"
import { db } from "../../../config/firebase"
import { collection, query, onSnapshot } from "firebase/firestore"
import { Users, X, Mail, School, BookOpen } from "lucide-react"
import Modal from "../../ui/Modal"

const ForumMembersSidebar = ({ courseId, selectedProfile, onClose, onProfileClick }) => {
  const [members, setMembers] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])

  // Buscar membros (todos os usuários cadastrados)
  useEffect(() => {
    const usersRef = collection(db, "users")
    const q = query(usersRef)

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      
      setMembers(usersData)
    })

    return () => unsubscribe()
  }, [])

  // Simular status online (você pode integrar com Firebase Realtime Database depois)
  const onlineMembersList = members.filter((m) => m.isOnline)
  const offlineMembersList = members.filter((m) => !m.isOnline)

  return (
    <>
      <div className="h-full border-l dark:border-gray-700/50 border-gray-300/50 dark:bg-gradient-to-b dark:from-[#1a1a1a] dark:to-[#1E1E1E] bg-gradient-to-b from-white to-gray-50 flex flex-col shadow-xl">
        {/* Header moderno */}
        <div className="p-5 border-b dark:border-gray-700/50 border-gray-300/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] rounded-xl shadow-lg shadow-[#8C43FF]/30">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base dark:text-white text-gray-900">
                  Membros
                </h3>
                <p className="text-xs dark:text-gray-400 text-gray-600">
                  {onlineMembersList.length} online
                </p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-full dark:bg-[#8C43FF]/20 bg-[#8C43FF]/10 text-sm dark:text-[#8C43FF] text-[#8C43FF] font-bold border dark:border-[#8C43FF]/30 border-[#8C43FF]/20">
              {members.length}
            </span>
          </div>
        </div>

        {/* Members List com scroll customizado */}
        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          <div className="space-y-4">
            {/* Online Members */}
            {onlineMembersList.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-2 mb-2">
                  <p className="text-xs font-bold dark:text-gray-400 text-gray-600 uppercase tracking-wider">
                    Online
                  </p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold dark:text-green-400 text-green-600">
                      {onlineMembersList.length}
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {onlineMembersList.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => onProfileClick(member)}
                      className="w-full flex items-center gap-3 p-3 rounded-2xl dark:hover:bg-[#2D2D2D] hover:bg-gray-100 transition-all duration-200 group hover:scale-[1.02] dark:bg-[#252525]/30 bg-white/80 border dark:border-gray-700/30 border-gray-200/50"
                    >
                      <div className="relative">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#8C43FF]/20 group-hover:scale-110 transition-transform">
                          {member.photoURL ? (
                            <img
                              src={member.photoURL}
                              alt={member.displayName || member.email}
                              className="w-full h-full rounded-2xl object-cover"
                            />
                          ) : (
                            <span>
                              {member.displayName?.[0]?.toUpperCase() || member.email?.[0]?.toUpperCase() || "?"}
                            </span>
                          )}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-green-500 rounded-full border-2 dark:border-[#252525] border-white shadow-sm animate-pulse" />
                      </div>
                      <span className="text-sm font-semibold dark:text-white text-gray-900 truncate group-hover:text-[#8C43FF] transition-colors">
                        {member.displayName || member.email?.split('@')[0] || "Anônimo"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Offline Members */}
            {offlineMembersList.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-2 mb-2">
                  <p className="text-xs font-bold dark:text-gray-400 text-gray-600 uppercase tracking-wider">
                    Offline
                  </p>
                  <span className="text-xs font-semibold dark:text-gray-500 text-gray-500">
                    {offlineMembersList.length}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {offlineMembersList.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => onProfileClick(member)}
                      className="w-full flex items-center gap-3 p-3 rounded-2xl dark:hover:bg-[#2D2D2D]/50 hover:bg-gray-100/50 transition-all duration-200 opacity-60 hover:opacity-80 dark:bg-[#252525]/20 bg-white/50 border dark:border-gray-700/20 border-gray-200/30"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center text-white font-bold text-sm">
                        {member.photoURL ? (
                          <img
                            src={member.photoURL}
                            alt={member.displayName || member.email}
                            className="w-full h-full rounded-2xl object-cover grayscale"
                          />
                        ) : (
                          <span>
                            {member.displayName?.[0]?.toUpperCase() || member.email?.[0]?.toUpperCase() || "?"}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-medium dark:text-gray-400 text-gray-600 truncate">
                        {member.displayName || member.email?.split('@')[0] || "Anônimo"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {members.length === 0 && (
              <div className="text-center py-12">
                <div className="mb-4 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-[#8C43FF]/10 rounded-full animate-pulse" />
                  </div>
                  <Users className="h-16 w-16 dark:text-gray-600 text-gray-400 mx-auto relative z-10" />
                </div>
                <p className="text-sm font-semibold dark:text-gray-300 text-gray-700">
                  Nenhum membro online
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal Melhorado */}
      {selectedProfile && (
        <Modal isOpen={!!selectedProfile} onClose={onClose}>
          <div className="p-8">
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-3xl font-bold dark:text-white text-gray-900">
                Perfil do Usuário
              </h2>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl dark:hover:bg-[#2D2D2D] hover:bg-gray-100 transition-all hover:scale-110"
              >
                <X size={24} className="dark:text-gray-400 text-gray-600" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-6">
              {/* Avatar com animação */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] rounded-3xl blur-2xl opacity-30 animate-pulse" />
                <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] flex items-center justify-center text-white font-bold text-4xl shadow-2xl shadow-[#8C43FF]/30">
                  {selectedProfile.photoURL || selectedProfile.photo ? (
                    <img
                      src={selectedProfile.photoURL || selectedProfile.photo}
                      alt={selectedProfile.displayName || selectedProfile.name || selectedProfile.email}
                      className="w-full h-full rounded-3xl object-cover"
                    />
                  ) : (
                    <span>
                      {(selectedProfile.displayName?.[0] || selectedProfile.name?.[0] || selectedProfile.email?.[0] || "?").toUpperCase()}
                    </span>
                  )}
                </div>
                {selectedProfile.isOnline && (
                  <div className="absolute bottom-2 right-2 h-8 w-8 bg-green-500 rounded-full border-4 dark:border-[#1E1E1E] border-white shadow-lg animate-pulse" />
                )}
              </div>

              {/* User Info modernizada */}
              <div className="text-center w-full">
                <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">
                  {selectedProfile.displayName || selectedProfile.name || selectedProfile.email?.split('@')[0] || "Anônimo"}
                </h3>
                
                <div className="space-y-3 mt-6">
                  {selectedProfile.email && (
                    <div className="flex items-center gap-3 justify-center p-3 rounded-xl dark:bg-[#252525]/50 bg-gray-100/80 backdrop-blur-sm">
                      <div className="p-2 bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] rounded-lg">
                        <Mail size={16} className="text-white" />
                      </div>
                      <span className="text-sm font-medium dark:text-gray-300 text-gray-700">{selectedProfile.email}</span>
                    </div>
                  )}
                  
                  {selectedProfile.course && (
                    <div className="flex items-center gap-3 justify-center p-3 rounded-xl dark:bg-[#252525]/50 bg-gray-100/80 backdrop-blur-sm">
                      <div className="p-2 bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] rounded-lg">
                        <BookOpen size={16} className="text-white" />
                      </div>
                      <span className="text-sm font-medium dark:text-gray-300 text-gray-700">{selectedProfile.course}</span>
                    </div>
                  )}
                  
                  {selectedProfile.school && (
                    <div className="flex items-center gap-3 justify-center p-3 rounded-xl dark:bg-[#252525]/50 bg-gray-100/80 backdrop-blur-sm">
                      <div className="p-2 bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] rounded-lg">
                        <School size={16} className="text-white" />
                      </div>
                      <span className="text-sm font-medium dark:text-gray-300 text-gray-700">{selectedProfile.school}</span>
                    </div>
                  )}
                </div>

                {selectedProfile.bio && (
                  <div className="mt-6 p-5 rounded-2xl dark:bg-[#252525]/50 bg-gray-100/80 backdrop-blur-sm border dark:border-gray-700/30 border-gray-200">
                    <p className="text-sm dark:text-gray-300 text-gray-700 text-center leading-relaxed">
                      {selectedProfile.bio}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* CSS para scrollbar customizada */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8C43FF;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B32C3;
        }
      `}</style>
    </>
  )
}

export default ForumMembersSidebar
