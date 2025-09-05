"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"

const analyticsModules = [
  {
    id: 1,
    title: "Emerging Trend Analysis",
    description: "Comprehensive analysis of emerging trends for R&D innovation and product development",
    icon: "📊",
    iconBg: "bg-orange-500",
    status: null,
    path: "/emerging-trends", // Add this
  },
  {
    id: 2,
    title: "Consumer Driver Analysis",
    description: "Understand key factors that drive consumer behavior and preferences",
    icon: "👥",
    iconBg: "bg-green-500",
    status: "Upcoming",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    title: "Product Preference Analysis",
    description: "Analyze consumer preferences and product performance metrics",
    icon: "💜",
    iconBg: "bg-purple-500",
    status: "Upcoming",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 4,
    title: "Brand Innovation",
    description: "Explore and develop innovative brand strategies based on consumer insights",
    icon: "💡",
    iconBg: "bg-orange-500",
    status: "Upcoming",
    statusColor: "bg-blue-100 text-blue-800",
  },
]

export default function ConsumerResearch() {
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Consumer Research Analytics</h1>
              <p className="text-gray-600">
                Discover <span className="text-blue-600">emerging trends</span> and consumer insights to drive
                innovation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analyticsModules.map((module) => (
                <div
                  key={module.id}
                  onClick={() => {
                    if (module.path) {
                      router.push(module.path)
                    }
                  }}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 ${module.iconBg} rounded-lg flex items-center justify-center text-white text-xl`}
                    >
                      {module.icon}
                    </div>
                    {module.status && <Badge className={module.statusColor}>{module.status}</Badge>}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{module.title}</h3>

                  <p className="text-gray-600 text-sm leading-relaxed">{module.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
