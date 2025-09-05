"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"

const analyticsModules = [
  {
    id: 1,
    title: "Provenance Analytics",
    description: "Track and analyze the origin and journey of raw materials",
    icon: "🔍",
    iconBg: "bg-blue-500",
    status: "Upcoming",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 2,
    title: "Packaging & Optimization",
    description: "Optimize packaging design for sustainability and efficiency",
    icon: "📦",
    iconBg: "bg-green-500",
    status: "Upcoming",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    title: "Artwork Compliance",
    description: "Ensure packaging artwork meets regulatory and brand standards",
    icon: "🎨",
    iconBg: "bg-purple-500",
    status: "Upcoming",
    statusColor: "bg-blue-100 text-blue-800",
  },
]

export default function SourcingPackaging() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sourcing & Packaging Analytics</h1>
              <p className="text-gray-600">
                Optimize <span className="text-blue-600">packaging design</span> and ensure artwork compliance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analyticsModules.map((module) => (
                <div
                  key={module.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-16 h-16 ${module.iconBg} rounded-lg flex items-center justify-center text-white text-2xl mb-4`}
                    >
                      {module.icon}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                      <Badge className={module.statusColor}>{module.status}</Badge>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">{module.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
