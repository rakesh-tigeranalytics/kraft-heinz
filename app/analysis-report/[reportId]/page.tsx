"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, FileText, Calendar, Building, MapPin } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

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

const chartData = [
  { year: 2024, baseline: 800, revenue: 800, net: 800 },
  { year: 2025, baseline: 850, revenue: 820, net: 780 },
  { year: 2026, baseline: 900, revenue: 880, net: 840 },
  { year: 2027, baseline: 950, revenue: 920, net: 880 },
  { year: 2028, baseline: 1000, revenue: 980, net: 940 },
]

export default function AnalysisReportView() {
  const router = useRouter()
  const params = useParams()
  const reportId = params.reportId as string

  const [report, setReport] = useState<AnalysisReport | null>(null)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Load the specific report
    const reports = JSON.parse(localStorage.getItem("analysisReports") || "[]")
    const foundReport = reports.find((r: AnalysisReport) => r.id === reportId)
    setReport(foundReport || null)
  }, [router, reportId])

  if (!report) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Report Not Found</h2>
              <p className="text-gray-600 mb-4">The analysis report you're looking for doesn't exist.</p>
              <Button
                onClick={() => router.push("/saved-analysis-reports")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Back to Reports
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
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
                  onClick={() => router.push("/saved-analysis-reports")}
                  className="mr-4 text-blue-600 hover:text-blue-700"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Reports
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-black">Analysis Report</h1>
                  <p className="text-sm text-gray-600">Substance Substitution Analysis for {report.productName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="text-black border-gray-300">
                  <FileText size={16} className="mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" className="text-black border-gray-300">
                  <Download size={16} className="mr-2" />
                  Export Word
                </Button>
              </div>
            </div>

            {/* Report Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-black mb-2">{report.productName}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>Created: {new Date(report.analysisDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Building size={14} className="mr-1" />
                      <span>Product ID: {report.productId}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      <span>Region: {report.selectedRegion}</span>
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{report.status}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-black mb-2">Analysis Parameters</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Production Volume:</span>
                      <span className="text-black font-medium">{report.productionVolume.toLocaleString()} units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time Period:</span>
                      <span className="text-black font-medium">{report.timePeriod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Market Region:</span>
                      <span className="text-black font-medium">{report.selectedRegion}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-black mb-2">Substitution Details</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Original Material:</span>
                      <div className="text-black font-medium">{report.originalMaterial}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Substitute:</span>
                      <div className="text-black font-medium">{report.selectedSubstitute.name}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">CAS Number:</span>
                      <div className="text-blue-600 font-medium">{report.selectedSubstitute.casNumber}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-black mb-2">Impact Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hazard Level:</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                        {report.selectedSubstitute.hazardLevel}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost Impact:</span>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-xs">
                        {report.selectedSubstitute.costImpact}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Performance:</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                        {report.selectedSubstitute.performanceImpact}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* All Substituted Products */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-black mb-6">Substituted Materials</h3>
              <div className="space-y-4">
                {Object.entries(report.selectedSubstitutes).map(([originalMaterial, substitute]) => (
                  <div key={originalMaterial} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-black mb-2">Original Material</h4>
                        <div className="space-y-1 text-sm">
                          <div className="text-black font-medium">{originalMaterial}</div>
                          <div className="text-gray-600">Status: Restricted</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-black mb-2">Substitute Material</h4>
                        <div className="space-y-1 text-sm">
                          <div className="text-black font-medium">{substitute.name}</div>
                          <div className="text-blue-600">{substitute.casNumber}</div>
                          <div className="text-gray-600">{substitute.description}</div>
                          <div className="flex space-x-2 mt-2">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                              {substitute.hazardLevel} Hazard
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
                              {substitute.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Impact */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-black mb-6">Financial Impact Analysis</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-red-900">Additional Costs</h4>
                    <span className="text-xs text-red-700">+8.5%</span>
                  </div>
                  <div className="text-2xl font-bold text-red-900">
                    ${report.financialImpact.additionalCosts.toFixed(1)}K
                  </div>
                  <p className="text-xs text-red-700 mt-1">Raw material cost increase per year</p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-green-900">Revenue Impact</h4>
                    <span className="text-xs text-green-700">+8.8%</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">
                    ${report.financialImpact.revenueImpact.toFixed(1)}K
                  </div>
                  <p className="text-xs text-green-700 mt-1">Revenue protection and growth per year</p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-blue-900">Net Impact</h4>
                    <span className="text-xs text-blue-700">+0.3%</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">
                    ${report.financialImpact.netImpact.toFixed(1)}K
                  </div>
                  <p className="text-xs text-blue-700 mt-1">Net financial benefit per year</p>
                </div>
              </div>

              {/* Revenue Projection Chart */}
              <div>
                <h4 className="text-md font-semibold text-black mb-4">Revenue Projection (5 Year)</h4>
                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `$${value}K`} />
                      <Tooltip formatter={(value) => [`$${value}K`, ""]} />
                      <Line
                        type="monotone"
                        dataKey="baseline"
                        stroke="#9CA3AF"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Baseline"
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10B981"
                        strokeWidth={3}
                        name="With Substitution"
                      />
                      <Line type="monotone" dataKey="net" stroke="#3B82F6" strokeWidth={2} name="Net Impact" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-400 mr-2"></div>
                    <span className="text-black">Baseline</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 mr-2"></div>
                    <span className="text-black">With Substitution</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 mr-2"></div>
                    <span className="text-black">Net Impact</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-black mb-4">Recommendations</h3>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-green-900 mb-2">✓ Proceed with Substitution</h4>
                  <p className="text-sm text-green-800">
                    The analysis shows a positive net financial impact of ${report.financialImpact.netImpact.toFixed(1)}
                    K annually. The substitute material offers improved safety profile while maintaining product
                    performance.
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">Implementation Timeline</h4>
                  <p className="text-sm text-blue-800">
                    Estimated 6-8 months for full implementation including regulatory approval, supplier qualification,
                    and production line adjustments.
                  </p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-yellow-900 mb-2">Risk Considerations</h4>
                  <p className="text-sm text-yellow-800">
                    Monitor supply chain stability for the new substitute material and conduct thorough testing to
                    ensure product quality standards are maintained.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
