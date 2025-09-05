"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"

const analyticsModules = [
  {
    id: 1,
    title: "White Space / Need Gap Analysis",
    description: "Identify market opportunities and unmet consumer needs",
    icon: "🔍",
    iconBg: "bg-blue-500",
    status: "Upcoming",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 2,
    title: "Product Attribution Analysis",
    description: "Analyze product attributes and their impact on performance",
    icon: "📊",
    iconBg: "bg-green-500",
    status: "Upcoming",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 3,
    title: "Pack Communication Optimization",
    description: "Optimize packaging communication for maximum consumer impact",
    icon: "💬",
    iconBg: "bg-purple-500",
    status: "Upcoming",
    statusColor: "bg-blue-100 text-blue-800",
  },
]

export default function ProductDevelopment() {
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Development Analytics</h1>
              <p className="text-gray-600">
                Analyze <span className="text-blue-600">market gaps</span> and optimize product attributes for success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analyticsModules.map((module) => (
                <div
                  key={module.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 ${module.iconBg} rounded-lg flex items-center justify-center text-white text-xl`}
                    >
                      {module.icon}
                    </div>
                    <Badge className={module.statusColor}>{module.status}</Badge>
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
