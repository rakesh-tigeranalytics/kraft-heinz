"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"

const projects = [
  {
    id: 1,
    title: "Idea Generation - Consumer Research",
    description: "Discover emerging trends and consumer insights to drive innovation",
    icon: "💡",
    iconBg: "bg-blue-500",
    status: "Active",
    statusColor: "bg-green-100 text-green-800",
    studies: 15,
    users: 28,
    updated: "2 hours ago",
  },
  {
    id: 2,
    title: "Product Development",
    description: "Analyze market gaps and optimize product attributes for success",
    icon: "✅",
    iconBg: "bg-green-500",
    status: "Beta",
    statusColor: "bg-blue-100 text-blue-800",
    projects: 32,
    users: 24,
    updated: "1 hour ago",
  },
  {
    id: 3,
    title: "Product Formulation",
    description: "Simplify formulas and predict testing outcomes efficiently",
    icon: "🧪",
    iconBg: "bg-purple-500",
    status: "Active",
    statusColor: "bg-green-100 text-green-800",
    formulas: 18,
    users: 10,
    updated: "3 hours ago",
  },
  {
    id: 4,
    title: "Regulatory Compliance",
    description: "Ensure safety standards and track substance compliance",
    icon: "🛡️",
    iconBg: "bg-red-500",
    status: "Active",
    statusColor: "bg-green-100 text-green-800",
    patents: 120,
    users: 15,
    updated: "1 hour ago",
  },
  {
    id: 5,
    title: "Sourcing & Packaging",
    description: "Optimize packaging design and ensure artwork compliance",
    icon: "📦",
    iconBg: "bg-orange-500",
    status: "Beta",
    statusColor: "bg-blue-100 text-blue-800",
    materials: "200+",
    users: 19,
    updated: "4 hours ago",
  },
  {
    id: 6,
    title: "Scaling & Launch",
    description: "Standardize processes and optimize formulas for market launch",
    icon: "🚀",
    iconBg: "bg-indigo-500",
    status: "Beta",
    statusColor: "bg-blue-100 text-blue-800",
    facilities: 12,
    users: 24,
    updated: "3 hours ago",
  },
  {
    id: 7,
    title: "Visibility & Reporting",
    description: "Track project lifecycles and monitor sustainability metrics",
    icon: "📊",
    iconBg: "bg-teal-500",
    status: "Beta",
    statusColor: "bg-blue-100 text-blue-800",
    initiatives: 25,
    users: 22,
    updated: "4 hours ago",
  },
]

export default function Dashboard() {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => {
                    if (project.title === "Idea Generation - Consumer Research") {
                      router.push("/consumer-research")
                    } else if (project.title === "Product Development") {
                      router.push("/product-development")
                    } else if (project.title === "Product Formulation") {
                      router.push("/product-formulation")
                    } else if (project.title === "Regulatory Compliance") {
                      router.push("/regulatory-compliance")
                    } else if (project.title === "Sourcing & Packaging") {
                      router.push("/sourcing-packaging")
                    } else if (project.title === "Scaling & Launch") {
                      router.push("/scaling-launch")
                    } else if (project.title === "Visibility & Reporting") {
                      router.push("/visibility-reporting")
                    }
                  }}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 ${project.iconBg} rounded-lg flex items-center justify-center text-white text-xl`}
                    >
                      {project.icon}
                    </div>
                    <Badge className={project.statusColor}>{project.status}</Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>

                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span>
                      {project.studies && `${project.studies} studies`}
                      {project.projects && `${project.projects} projects`}
                      {project.formulas && `${project.formulas} formulas`}
                      {project.patents && `${project.patents} patents`}
                      {project.materials && `${project.materials} materials`}
                      {project.facilities && `${project.facilities} facilities`}
                      {project.initiatives && `${project.initiatives} initiatives`}
                    </span>
                    <span>{project.users} users</span>
                  </div>

                  <div className="text-xs text-gray-400">Updated {project.updated}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
