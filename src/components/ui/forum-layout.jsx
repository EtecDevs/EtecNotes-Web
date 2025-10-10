"use client"

import { useState } from "react"
import { CourseSidebar } from "./course-sidebar"
import { ChatArea } from "./chat-area"
import { MembersSidebar } from "./members-sidebar"

export function ForumLayout({ user, profile, courses }) {
  const [selectedCourse, setSelectedCourse] = useState(courses[0] || null)
  const [selectedProfile, setSelectedProfile] = useState(null)

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - Courses */}
      <CourseSidebar
        courses={courses}
        selectedCourse={selectedCourse}
        onSelectCourse={setSelectedCourse}
        currentUser={user}
        currentProfile={profile}
      />

      {/* Center - Chat Area */}
      <ChatArea
        course={selectedCourse}
        currentUser={user}
        currentProfile={profile}
        onProfileClick={setSelectedProfile}
      />

      {/* Right Sidebar - Members */}
      <MembersSidebar
        courseId={selectedCourse?.id}
        selectedProfile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
        onProfileClick={setSelectedProfile}
      />
    </div>
  )
}
