"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

const internalDataSources = [
  {
    id: 1,
    title: "Internal Laboratory Testing Data",
    description: "R&D test results, formulation data, and quality control metrics",
    icon: "🧪",
    iconBg: "bg-red-500",
  },
  {
    id: 2,
    title: "Manufacturing and Quality Assurance Data",
    description: "Production metrics, quality control data, and manufacturing process optimization",
    icon: "🏭",
    iconBg: "bg-blue-500",
  },
  {
    id: 3,
    title: "Intellectual Property Data",
    description: "Patent portfolios, trademark data, and IP competitive intelligence",
    icon: "💡",
    iconBg: "bg-purple-500",
  },
  {
    id: 4,
    title: "Product Formulation Data",
    description: "Ingredient databases, formulation recipes, and product composition data",
    icon: "📋",
    iconBg: "bg-orange-500",
  },
  {
    id: 5,
    title: "Sales Data",
    description: "Historical and real-time sales data across all product lines and regions",
    icon: "📈",
    iconBg: "bg-blue-600",
  },
  {
    id: 6,
    title: "Customer Relationship Data",
    description: "Customer profiles, interactions, and feedback from CRM systems",
    icon: "👥",
    iconBg: "bg-green-500",
  },
  {
    id: 7,
    title: "Marketing Campaign Performance Data",
    description: "Campaign metrics, ROI analysis, and channel performance data",
    icon: "📊",
    iconBg: "bg-purple-600",
  },
  {
    id: 8,
    title: "Social Media Data",
    description: "Consumer sentiment, engagement metrics, and trend analysis from social platforms",
    icon: "📱",
    iconBg: "bg-pink-500",
  },
  {
    id: 9,
    title: "Supply Chain & Operations Data",
    description: "Manufacturing, logistics, and inventory data across the supply chain",
    icon: "🚚",
    iconBg: "bg-orange-600",
  },
  {
    id: 10,
    title: "Financial Data",
    description: "Cost analysis, budget data, and financial performance metrics",
    icon: "💰",
    iconBg: "bg-teal-500",
  },
]

// Update the external data sources array to include the regulatory data as clickable
const externalDataSources = [
  {
    id: 11,
    title: "Consumer Insights Data",
    description: "Market research, consumer behavior studies, and trend reports",
    icon: "👤",
    iconBg: "bg-purple-500",
  },
  {
    id: 12,
    title: "Market & Competitive Intelligence Data",
    description: "Competitive analysis, market share data, and industry benchmarks",
    icon: "🎯",
    iconBg: "bg-orange-500",
  },
  {
    id: 13,
    title: "Scientific & Technological Data",
    description: "Research papers, patent databases, and technological trend analysis",
    icon: "🔬",
    iconBg: "bg-blue-500",
  },
  {
    id: 14,
    title: "Regulatory & Compliance Data",
    description: "Global regulatory requirements, compliance standards, and policy updates",
    icon: "📋",
    iconBg: "bg-purple-600",
    path: "/regulatory-compliance-data", // Add path for navigation
  },
  {
    id: 15,
    title: "Economic & Demographic Data",
    description: "Population statistics, economic indicators, and consumer demographic data",
    icon: "📊",
    iconBg: "bg-green-600",
  },
]

export default function DataDiscovery() {
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
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Discovery Portal</h1>
                <p className="text-gray-600">
                  Access and explore data from various sources to drive{" "}
                  <span className="text-blue-600">R&D Innovation</span>
                </p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <h2 className="text-xl font-semibold text-gray-900">Internal Data Sources</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {internalDataSources.map((source) => (
                  <div
                    key={source.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start mb-3">
                      <div
                        className={`w-10 h-10 ${source.iconBg} rounded-lg flex items-center justify-center text-white text-lg mr-3`}
                      >
                        {source.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm mb-1">{source.title}</h3>
                        <p className="text-gray-600 text-xs">{source.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <h2 className="text-xl font-semibold text-gray-900">External Data Sources</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {externalDataSources.map((source) => (
                  <div
                    key={source.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => {
                      if (source.path) {
                        router.push(source.path)
                      }
                    }}
                  >
                    <div className="flex items-start mb-3">
                      <div
                        className={`w-10 h-10 ${source.iconBg} rounded-lg flex items-center justify-center text-white text-lg mr-3`}
                      >
                        {source.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm mb-1">{source.title}</h3>
                        <p className="text-gray-600 text-xs">{source.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
