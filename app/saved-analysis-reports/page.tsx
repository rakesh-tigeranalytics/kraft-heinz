"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Calendar, FileText, Download, Trash2, Eye } from "lucide-react"

interface AnalysisReport {
  id: string
  productId: string
  productName: string
  analysisDate: string
  selectedSubstitutes: { [key: string]: any }
  originalMaterial: string
  selectedSubstitute: any
  productionVolume: number
  timePeriod: string
  selectedRegion: string
  financialImpact: {
    additionalCosts: number
    revenueImpact: number
    netImpact: number
  }
  status: string
}

export default function SavedAnalysisReports() {
  const router = useRouter()
  const [analysisReports, setAnalysisReports] = useState<AnalysisReport[]>([])
  const [filteredReports, setFilteredReports] = useState<AnalysisReport[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Load saved analysis reports from localStorage
    const reports = JSON.parse(localStorage.getItem("analysisReports") || "[]")
    setAnalysisReports(reports)
    setFilteredReports(reports)
  }, [router])

  useEffect(() => {
    let filtered = analysisReports

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.productId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.originalMaterial.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.selectedSubstitute.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((report) => report.status.toLowerCase() === statusFilter)
    }

    // Sort reports
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.analysisDate).getTime() - new Date(a.analysisDate).getTime()
        case "product":
          return a.productName.localeCompare(b.productName)
        case "impact":
          return b.financialImpact.netImpact - a.financialImpact.netImpact
        default:
          return 0
      }
    })

    setFilteredReports(filtered)
  }, [analysisReports, searchTerm, statusFilter, sortBy])

  const deleteReport = (id: string) => {
    const updatedReports = analysisReports.filter((report) => report.id !== id)
    setAnalysisReports(updatedReports)
    localStorage.setItem("analysisReports", JSON.stringify(updatedReports))
  }

  const viewReport = (report: AnalysisReport) => {
    router.push(`/analysis-report/${report.id}`)
  }

  const getImpactColor = (impact: number) => {
    if (impact > 0) return "text-green-600"
    if (impact < 0) return "text-red-600"
    return "text-gray-600"
  }

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
                  onClick={() => router.push("/restricted-substance-list")}
                  className="mr-4 text-blue-600 hover:text-blue-700"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Restricted Substance List
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-black">Saved Analysis Reports</h1>
                  <p className="text-sm text-gray-600">View and manage your substance substitution analysis reports</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="text-black border-gray-300">
                  <FileText size={16} className="mr-2" />
                  Export All
                </Button>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date Created</SelectItem>
                    <SelectItem value="product">Product Name</SelectItem>
                    <SelectItem value="impact">Financial Impact</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-sm text-gray-600 flex items-center">
                  <span className="font-medium">{filteredReports.length}</span>
                  <span className="ml-1">reports found</span>
                </div>
              </div>
            </div>

            {/* Reports List */}
            {filteredReports.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Analysis Reports Found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || statusFilter !== "all"
                    ? "No reports match your current filters."
                    : "You haven't saved any analysis reports yet. Start by analyzing a product's restricted substances."}
                </p>
                <Button
                  onClick={() => router.push("/restricted-substance-list")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Go to Restricted Substance List
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <h3 className="text-lg font-semibold text-black mr-3">{report.productName}</h3>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mr-2">{report.productId}</Badge>
                          <Badge
                            className={
                              report.status === "Completed"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            }
                          >
                            {report.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <span className="text-sm text-gray-600">Original Material:</span>
                            <div className="text-sm font-medium text-black">{report.originalMaterial}</div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Substitute:</span>
                            <div className="text-sm font-medium text-black">{report.selectedSubstitute.name}</div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Region:</span>
                            <div className="text-sm font-medium text-black">{report.selectedRegion}</div>
                          </div>
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {new Date(report.analysisDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-red-50 p-3 rounded-lg">
                            <span className="text-xs text-red-700">Additional Costs</span>
                            <div className="text-lg font-bold text-red-900">
                              ${report.financialImpact.additionalCosts.toFixed(1)}K
                            </div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <span className="text-xs text-green-700">Revenue Impact</span>
                            <div className="text-lg font-bold text-green-900">
                              ${report.financialImpact.revenueImpact.toFixed(1)}K
                            </div>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <span className="text-xs text-blue-700">Net Impact</span>
                            <div className={`text-lg font-bold ${getImpactColor(report.financialImpact.netImpact)}`}>
                              ${report.financialImpact.netImpact.toFixed(1)}K
                            </div>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Production Volume:</span>{" "}
                          {report.productionVolume.toLocaleString()} units
                          <span className="mx-2">•</span>
                          <span className="font-medium">Analysis Period:</span> {report.timePeriod}
                          <span className="mx-2">•</span>
                          <span className="font-medium">Substitutes:</span>{" "}
                          {Object.keys(report.selectedSubstitutes).length} materials
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          onClick={() => viewReport(report)}
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-600 hover:bg-blue-50"
                        >
                          <Eye size={14} className="mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="text-black border-gray-300">
                          <Download size={14} className="mr-1" />
                          Export
                        </Button>
                        <Button
                          onClick={() => deleteReport(report.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
