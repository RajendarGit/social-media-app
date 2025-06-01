"use client"

import { useState } from "react"
import Header from "./header"
import LeftSidebar from "./left-sidebar"
import RightSidebar from "./right-sidebar"
import Feed from "../feed/feed"
import ProfilePage from "../profile/profile-page"

export default function MainLayout() {
  const [currentPage, setCurrentPage] = useState<"feed" | "profile">("feed")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <LeftSidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">{currentPage === "feed" ? <Feed /> : <ProfilePage />}</div>

          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
