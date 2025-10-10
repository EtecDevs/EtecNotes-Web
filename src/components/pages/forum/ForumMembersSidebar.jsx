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
      <div className="w-60 border-l dark:border-gray-700 border-gray-300 dark:bg-[#1E1E1E] bg-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b dark:border-gray-700 border-gray-300">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 dark:text-gray-400 text-gray-600" />
            <h3 className="font-semibold text-sm dark:text-white text-gray-900">
              Membros
            </h3>
            <span className="ml-auto px-2 py-0.5 rounded-full dark:bg-[#2D2D2D] bg-gray-200 text-xs dark:text-gray-400 text-gray-600 font-medium">
              {members.length}
            </span>
          </div>
        </div>

        {/* Members List */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-4">
            {/* Online Members */}
            {onlineMembersList.length > 0 && (
              <div>
                <p className="text-xs font-semibold dark:text-gray-400 text-gray-600 px-2 mb-2">
                  ONLINE — {onlineMembersList.length}
                </p>
                <div className="space-y-1">
                  {onlineMembersList.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => onProfileClick(member)}
                      className="w-full flex items-center gap-2 p-2 rounded-lg dark:hover:bg-[#2D2D2D] hover:bg-gray-100 transition-colors"
                    >
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] flex items-center justify-center text-white font-bold text-sm">
                          {member.photoURL ? (
                            <img
                              src={member.photoURL}
                              alt={member.displayName || member.email}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span>
                              {member.displayName?.[0]?.toUpperCase() || member.email?.[0]?.toUpperCase() || "?"}
                            </span>
                          )}
                        </div>
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 dark:border-[#1E1E1E] border-white" />
                      </div>
                      <span className="text-sm font-medium dark:text-white text-gray-900 truncate">
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
                <p className="text-xs font-semibold dark:text-gray-400 text-gray-600 px-2 mb-2">
                  OFFLINE — {offlineMembersList.length}
                </p>
                <div className="space-y-1">
                  {offlineMembersList.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => onProfileClick(member)}
                      className="w-full flex items-center gap-2 p-2 rounded-lg dark:hover:bg-[#2D2D2D] hover:bg-gray-100 transition-colors opacity-60"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center text-white font-bold text-sm">
                        {member.photoURL ? (
                          <img
                            src={member.photoURL}
                            alt={member.displayName || member.email}
                            className="w-full h-full rounded-full object-cover grayscale"
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
              <div className="text-center py-8">
                <Users className="h-12 w-12 dark:text-gray-600 text-gray-400 mx-auto mb-2" />
                <p className="text-sm dark:text-gray-400 text-gray-600">
                  Nenhum membro online
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <Modal isOpen={!!selectedProfile} onClose={onClose}>
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold dark:text-white text-gray-900">
                Perfil do Usuário
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg dark:hover:bg-[#2D2D2D] hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="dark:text-gray-400 text-gray-600" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8C43FF] to-[#6B32C3] flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                  {selectedProfile.photoURL || selectedProfile.photo ? (
                    <img
                      src={selectedProfile.photoURL || selectedProfile.photo}
                      alt={selectedProfile.displayName || selectedProfile.name || selectedProfile.email}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span>
                      {(selectedProfile.displayName?.[0] || selectedProfile.name?.[0] || selectedProfile.email?.[0] || "?").toUpperCase()}
                    </span>
                  )}
                </div>
                {selectedProfile.isOnline && (
                  <div className="absolute bottom-1 right-1 h-6 w-6 bg-green-500 rounded-full border-4 dark:border-[#1E1E1E] border-white" />
                )}
              </div>

              {/* User Info */}
              <div className="text-center w-full">
                <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-1">
                  {selectedProfile.displayName || selectedProfile.name || selectedProfile.email?.split('@')[0] || "Anônimo"}
                </h3>
                
                <div className="space-y-2 mt-4">
                  {selectedProfile.email && (
                    <div className="flex items-center gap-2 justify-center dark:text-gray-400 text-gray-600">
                      <Mail size={16} />
                      <span className="text-sm">{selectedProfile.email}</span>
                    </div>
                  )}
                  
                  {selectedProfile.course && (
                    <div className="flex items-center gap-2 justify-center dark:text-gray-400 text-gray-600">
                      <BookOpen size={16} />
                      <span className="text-sm">{selectedProfile.course}</span>
                    </div>
                  )}
                  
                  {selectedProfile.school && (
                    <div className="flex items-center gap-2 justify-center dark:text-gray-400 text-gray-600">
                      <School size={16} />
                      <span className="text-sm">{selectedProfile.school}</span>
                    </div>
                  )}
                </div>

                {selectedProfile.bio && (
                  <div className="mt-4 p-4 rounded-lg dark:bg-[#2D2D2D] bg-gray-100">
                    <p className="text-sm dark:text-gray-300 text-gray-700 text-center">
                      {selectedProfile.bio}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default ForumMembersSidebar
