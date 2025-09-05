"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react"

const navigationItems = [
  { name: "R&D Data Products Hub", path: "/dashboard", section: "NAVIGATION" },
  { name: "Data Discovery", path: "/data-discovery", section: "NAVIGATION" },
  { name: "Ask & Analyze", path: "/ask-analyze", section: "NAVIGATION" },
]

const rdProductItems = [
  { name: "Idea Generation - Consumer Research", path: "/consumer-research" },
  { name: "Emerging Trend Analysis", path: "/emerging-trends" },
  { name: "Product Development", path: "/product-development" },
  { name: "Product Formulation", path: "/product-formulation" },
  { name: "Regulatory Compliance", path: "/regulatory-compliance" },
  { name: "Sourcing & Packaging", path: "/sourcing-packaging" },
  { name: "Scaling & Launch", path: "/scaling-launch" },
  { name: "Visibility & Reporting", path: "/visibility-reporting" },
]

const platformItems = [
  { name: "Active Products", path: "/active-products", count: 7 },
  { name: "Total Users", path: "/total-users", count: 167 },
  { name: "Data Sources", path: "/data-sources", count: 42 },
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/login")
  }

  // Get the active R&D product item
  const activeRdProduct = rdProductItems.find((item) => pathname === item.path)

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            {!isCollapsed && <span className="ml-1"></span>}
          </button>

          {!isCollapsed && (
            <>
              <div className="mb-6">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">NAVIGATION</div>
                <nav className="space-y-1">
                  {navigationItems.map((item) => (
                    <div key={item.path}>
                      <button
                        onClick={() => router.push(item.path)}
                        className={cn(
                          "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                          pathname === item.path || (item.name === "R&D Data Products Hub" && activeRdProduct)
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-700 hover:bg-gray-50",
                        )}
                      >
                        {item.name}
                      </button>
                      {/* Show active R&D product sub-item only when there's an active one */}
                      {item.name === "R&D Data Products Hub" && activeRdProduct && (
                        <div className="ml-4 mt-1">
                          <button
                            onClick={() => router.push(activeRdProduct.path)}
                            className="w-full text-left px-3 py-1 text-xs rounded-md bg-blue-50 text-blue-700 font-medium"
                          >
                            {activeRdProduct.name}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              <div className="mb-6">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  PLATFORM OVERVIEW
                </div>
                <div className="space-y-1">
                  {platformItems.map((item) => (
                    <div key={item.name} className="flex items-center justify-between px-3 py-2 text-sm text-gray-700">
                      <span>{item.name}</span>
                      <span className="text-gray-500">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <button className="text-sm text-gray-700 hover:text-gray-900 mb-2 block">Console</button>
                <button onClick={handleLogout} className="flex items-center text-sm text-red-600 hover:text-red-700">
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
