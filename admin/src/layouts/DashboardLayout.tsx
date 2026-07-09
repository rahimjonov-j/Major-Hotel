import { useState } from "react"
import { Outlet } from "react-router-dom"
import { SidebarNav } from "@/components/layout/SidebarNav"
import { Header } from "@/components/layout/Header"

export function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">
        <SidebarNav />
      </aside>

      <div className="flex min-h-screen flex-col lg:pl-64">
        <Header mobileNavOpen={mobileNavOpen} onMobileNavChange={setMobileNavOpen} />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
