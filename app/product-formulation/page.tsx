"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"

const analyticsModules = [
  {
    id: 1,
    title: "Formula Optimization",
    description: "Optimize product formulas for performance and cost efficiency",
    icon: "⚗️",
    iconBg: "bg-purple-500",
    status: "Upcoming",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 2,
    title: "Testing Outcome Prediction",
    description: "Predict testing outcomes based on formula attributes and historical data",
    icon: "📋",
    iconBg: "bg-blue-500",
    status: null, // Remove "Upcoming" status
    statusColor: "",
    path: "/testing-outcome-prediction", // Add path for navigation
  },
  {
    id: 3,
    title: "Ingredient Analysis",
    description: "Analyze ingredient effectiveness and alternatives for product formulation",
    icon: "🧪",
    iconBg: "bg-green-500",
    status: "Upcoming",
    statusColor: "bg-blue-100 text-blue-800",
  },
]

export default function ProductFormulation() {
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Formulation Analytics</h1>
              <p className="text-gray-600">
                Simplify <span className="text-blue-600">formulas</span> and predict testing outcomes efficiently
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analyticsModules.map((module) => (
                <div
                  key={module.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    if (module.path) {
                      router.push(module.path)
                    } else if (module.title === "Testing Outcome Prediction") {
                      router.push("/testing-outcome-prediction")
                    }
                  }}
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
