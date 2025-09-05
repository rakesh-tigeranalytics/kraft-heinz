"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Download, FileText, MessageSquare } from "lucide-react"

const products = [
  {
    id: "HG-001-US",
    name: "HUGGIES Little Snugglers Size 1",
    category: "Baby Care",
    region: "US",
    status: "Active",
    restrictedMaterials: 0,
    complianceStatus: "Compliant",
    lastChecked: "2024-01-15",
  },
  {
    id: "HG-002-EU",
    name: "HUGGIES Little Snugglers Size 2",
    category: "Baby Care",
    region: "EU",
    status: "Active",
    restrictedMaterials: 5,
    complianceStatus: "Non-Compliant",
    lastChecked: "2024-01-12",
  },
  {
    id: "KL-001-US",
    name: "KLEENEX Ultra Soft Facial Tissues",
    category: "Family Care",
    region: "US",
    status: "Active",
    restrictedMaterials: 0,
    complianceStatus: "Compliant",
    lastChecked: "2024-01-14",
  },
  {
    id: "CT-001-CA",
    name: "COTTONELLE Ultra Comfort Toilet Paper",
    category: "Family Care",
    region: "CA",
    status: "Active",
    restrictedMaterials: 0,
    complianceStatus: "Compliant",
    lastChecked: "2024-01-13",
  },
  {
    id: "SC-001-US",
    name: "SCOTT Paper Towels Choose-A-Sheet",
    category: "Family Care",
    region: "US",
    status: "Active",
    restrictedMaterials: 0,
    complianceStatus: "Compliant",
    lastChecked: "2024-01-11",
  },
  {
    id: "DP-001-EU",
    name: "DEPEND Silhouette Underwear",
    category: "Adult Care",
    region: "EU",
    status: "Active",
    restrictedMaterials: 6,
    complianceStatus: "Non-Compliant",
    lastChecked: "2024-01-09",
  },
  {
    id: "PS-001-US",
    name: "POISE Ultra Thin Pads",
    category: "Feminine Care",
    region: "US",
    status: "Active",
    restrictedMaterials: 0,
    complianceStatus: "Compliant",
    lastChecked: "2024-01-16",
  },
]

export default function RestrictedSubstanceList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [selectedStatus, setSelectedStatus] = useState("All Statuses")
  const [selectedCompliance, setSelectedCompliance] = useState("All Compliance")

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  const getComplianceStatusBadge = (status: string) => {
    switch (status) {
      case "Compliant":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>
      case "Non-Compliant":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{status}</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>
    }
  }

  const handleAnalyze = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product?.complianceStatus === "Compliant") {
      router.push(`/compliant-product-analysis/${productId}`)
    } else {
      router.push(`/restricted-substance-analysis/${productId}`)
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory
    const matchesRegion = selectedRegion === "All Regions" || product.region === selectedRegion
    const matchesStatus = selectedStatus === "All Statuses" || product.status === selectedStatus
    const matchesCompliance = selectedCompliance === "All Compliance" || product.complianceStatus === selectedCompliance

    return matchesSearch && matchesCategory && matchesRegion && matchesStatus && matchesCompliance
  })

  const totalProducts = products.length
  const withRestrictions = products.filter((p) => p.restrictedMaterials > 0).length
  const compliantProducts = products.filter((p) => p.complianceStatus === "Compliant").length
  const recentSubstitutions = 7 // Static for demo

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  onClick={() => router.push("/regulatory-compliance")}
                  className="mr-4 text-blue-600 hover:text-blue-700"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-black">Restricted Substance List</h1>
                  <p className="text-sm text-black">Manage and track restricted substances across product portfolios</p>
                </div>
              </div>
              <Button onClick={() => router.push("/rsl-chatbot")} className="bg-blue-600 hover:bg-blue-700 text-white">
                <MessageSquare size={16} className="mr-2" />
                RSL Assistant
              </Button>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-black">{totalProducts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">With Restrictions</p>
                    <p className="text-2xl font-bold text-black">{withRestrictions}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Compliant Products</p>
                    <p className="text-2xl font-bold text-black">{compliantProducts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Recent Substitutions</p>
                    <p className="text-2xl font-bold text-black">{recentSubstitutions}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Analysis Section */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-black flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      Product Analysis
                    </h2>
                    <p className="text-sm text-black">Comprehensive product compliance tracking and analysis</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="text-black border-gray-300">
                      <FileText size={14} className="mr-2" />
                      Saved Reports
                    </Button>
                    <Button variant="outline" size="sm" className="text-black border-gray-300">
                      <Download size={14} className="mr-2" />
                      Export Data
                    </Button>
                  </div>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center justify-between">
                  <div className="relative w-80">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search products, product IDs, or categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 text-black"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Categories">All Categories</SelectItem>
                        <SelectItem value="Baby Care">Baby Care</SelectItem>
                        <SelectItem value="Family Care">Family Care</SelectItem>
                        <SelectItem value="Adult Care">Adult Care</SelectItem>
                        <SelectItem value="Feminine Care">Feminine Care</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Regions">All Regions</SelectItem>
                        <SelectItem value="US">US</SelectItem>
                        <SelectItem value="EU">EU</SelectItem>
                        <SelectItem value="CA">CA</SelectItem>
                        <SelectItem value="JP">JP</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Statuses">All Statuses</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedCompliance} onValueChange={setSelectedCompliance}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Compliance">All Compliance</SelectItem>
                        <SelectItem value="Compliant">Compliant</SelectItem>
                        <SelectItem value="Non-Compliant">Non-Compliant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <div className="flex items-center justify-between px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
                  <span>
                    Showing {filteredProducts.length} of {totalProducts} products
                  </span>
                  <div className="flex items-center space-x-2">
                    <span>Sort by:</span>
                    <Select defaultValue="Product ID">
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Product ID">Product ID</SelectItem>
                        <SelectItem value="Product Name">Product Name</SelectItem>
                        <SelectItem value="Last Checked">Last Checked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Product ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Region
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Restricted Materials
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Compliance Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Last Checked
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">{product.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{product.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{product.region}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{product.status}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                          <div className="flex items-center">
                            <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                              <span className="text-xs text-gray-600">{product.restrictedMaterials}</span>
                            </div>
                            {product.restrictedMaterials}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getComplianceStatusBadge(product.complianceStatus)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{product.lastChecked}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button
                            onClick={() => handleAnalyze(product.id)}
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Analyze
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
