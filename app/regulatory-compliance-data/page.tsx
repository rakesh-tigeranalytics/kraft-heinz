"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Eye } from "lucide-react"

const regulatoryData = [
  {
    id: "US",
    country: "United States",
    code: "US",
    agencies: "FDA & EPA",
    documentsCount: 4,
    color: "bg-blue-100 border-blue-300",
    reports: [
      {
        id: "US-001",
        title: "FDA Safety Assessment - Baby Care Products",
        type: "Safety Assessment",
        date: "2024-12-15",
        status: "Current",
        size: "2.4 MB",
      },
      {
        id: "US-002",
        title: "EPA Environmental Impact - Tissue Products",
        type: "Environmental Study",
        date: "2024-11-28",
        status: "Current",
        size: "1.8 MB",
      },
      {
        id: "US-003",
        title: "CPSC Consumer Safety Report - Adult Care",
        type: "Consumer Safety",
        date: "2024-10-20",
        status: "Current",
        size: "3.1 MB",
      },
      {
        id: "US-004",
        title: "OSHA Workplace Safety - Manufacturing",
        type: "Workplace Safety",
        date: "2024-09-15",
        status: "Archived",
        size: "1.5 MB",
      },
    ],
  },
  {
    id: "EU",
    country: "European Union",
    code: "EU",
    agencies: "ECHA & EMA",
    documentsCount: 4,
    color: "bg-green-100 border-green-300",
    reports: [
      {
        id: "EU-001",
        title: "ECHA Chemical Safety Report - Personal Care",
        type: "Chemical Safety",
        date: "2024-12-10",
        status: "Current",
        size: "2.8 MB",
      },
      {
        id: "EU-002",
        title: "EMA Risk Assessment - Feminine Care Products",
        type: "Risk Assessment",
        date: "2024-11-22",
        status: "Current",
        size: "2.2 MB",
      },
      {
        id: "EU-003",
        title: "BfR Safety Evaluation - Baby Care",
        type: "Safety Evaluation",
        date: "2024-10-18",
        status: "Current",
        size: "1.9 MB",
      },
      {
        id: "EU-004",
        title: "REACH Compliance Report - All Categories",
        type: "Compliance Report",
        date: "2024-09-25",
        status: "Current",
        size: "4.2 MB",
      },
    ],
  },
  {
    id: "JP",
    country: "Japan",
    code: "JP",
    agencies: "MHLW & NITE",
    documentsCount: 4,
    color: "bg-red-100 border-red-300",
    reports: [
      {
        id: "JP-001",
        title: "MHLW Safety Evaluation - Consumer Tissue",
        type: "Safety Evaluation",
        date: "2024-12-08",
        status: "Current",
        size: "1.7 MB",
      },
      {
        id: "JP-002",
        title: "NITE Chemical Risk Assessment - Adult Care",
        type: "Risk Assessment",
        date: "2024-11-15",
        status: "Current",
        size: "2.5 MB",
      },
      {
        id: "JP-003",
        title: "JIS Safety Standards - Professional Products",
        type: "Standards Compliance",
        date: "2024-10-30",
        status: "Current",
        size: "1.3 MB",
      },
      {
        id: "JP-004",
        title: "PMDA Product Registration - Baby Care",
        type: "Registration Report",
        date: "2024-09-12",
        status: "Current",
        size: "2.1 MB",
      },
    ],
  },
  {
    id: "CA",
    country: "Canada",
    code: "CA",
    agencies: "Health Canada",
    documentsCount: 4,
    color: "bg-yellow-100 border-yellow-300",
    reports: [
      {
        id: "CA-001",
        title: "Health Canada Safety Review - Feminine Care",
        type: "Safety Review",
        date: "2024-12-05",
        status: "Current",
        size: "2.0 MB",
      },
      {
        id: "CA-002",
        title: "Environment Canada Assessment - Tissue Products",
        type: "Environmental Assessment",
        date: "2024-11-18",
        status: "Current",
        size: "1.6 MB",
      },
      {
        id: "CA-003",
        title: "CFIA Product Safety Report - Baby Care",
        type: "Product Safety",
        date: "2024-10-25",
        status: "Current",
        size: "2.3 MB",
      },
      {
        id: "CA-004",
        title: "Transport Canada Hazmat Classification",
        type: "Classification Report",
        date: "2024-09-08",
        status: "Current",
        size: "1.1 MB",
      },
    ],
  },
  {
    id: "AU",
    country: "Australia",
    code: "AU",
    agencies: "TGA & ACCC",
    documentsCount: 4,
    color: "bg-purple-100 border-purple-300",
    reports: [
      {
        id: "AU-001",
        title: "TGA Safety Assessment - Personal Care",
        type: "Safety Assessment",
        date: "2024-12-02",
        status: "Current",
        size: "1.9 MB",
      },
      {
        id: "AU-002",
        title: "ACCC Product Safety Review - Adult Care",
        type: "Product Safety",
        date: "2024-11-12",
        status: "Current",
        size: "2.4 MB",
      },
      {
        id: "AU-003",
        title: "Standards Australia Compliance - Professional",
        type: "Standards Compliance",
        date: "2024-10-28",
        status: "Current",
        size: "1.5 MB",
      },
      {
        id: "AU-004",
        title: "APVMA Chemical Assessment - All Categories",
        type: "Chemical Assessment",
        date: "2024-09-20",
        status: "Current",
        size: "3.0 MB",
      },
    ],
  },
  {
    id: "BR",
    country: "Brazil",
    code: "BR",
    agencies: "ANVISA",
    documentsCount: 4,
    color: "bg-orange-100 border-orange-300",
    reports: [
      {
        id: "BR-001",
        title: "ANVISA Product Registration - Baby Care",
        type: "Registration Report",
        date: "2024-11-30",
        status: "Current",
        size: "2.6 MB",
      },
      {
        id: "BR-002",
        title: "IBAMA Environmental Assessment - Tissue",
        type: "Environmental Assessment",
        date: "2024-11-08",
        status: "Current",
        size: "1.8 MB",
      },
      {
        id: "BR-003",
        title: "INMETRO Safety Certification - Consumer Products",
        type: "Safety Certification",
        date: "2024-10-15",
        status: "Current",
        size: "2.1 MB",
      },
      {
        id: "BR-004",
        title: "Ministry of Health Risk Assessment",
        type: "Risk Assessment",
        date: "2024-09-18",
        status: "Current",
        size: "1.7 MB",
      },
    ],
  },
]

export default function RegulatoryComplianceData() {
  const router = useRouter()
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId)
  }

  const handleDownload = (reportId: string, title: string) => {
    // Simulate download
    console.log(`Downloading report: ${reportId} - ${title}`)
    alert(`Downloading: ${title}`)
  }

  const handleView = (reportId: string, title: string) => {
    // Simulate view
    console.log(`Viewing report: ${reportId} - ${title}`)
    alert(`Opening: ${title}`)
  }

  const selectedRegionData = selectedRegion ? regulatoryData.find((region) => region.id === selectedRegion) : null

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center mb-8">
              <Button
                variant="ghost"
                onClick={() => router.push("/data-discovery")}
                className="mr-4 text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Data Discovery
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-black">Regulatory & Compliance Data</h1>
                <p className="text-sm text-blue-600">
                  Access regulatory requirements and compliance standards by country
                </p>
              </div>
            </div>

            {!selectedRegion ? (
              /* Region Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regulatoryData.map((region) => (
                  <div
                    key={region.id}
                    className={`${region.color} rounded-lg border-2 p-6 cursor-pointer hover:shadow-md transition-shadow`}
                    onClick={() => handleRegionClick(region.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-white rounded-lg px-3 py-1 text-lg font-bold text-black">{region.code}</div>
                    </div>

                    <h3 className="text-lg font-semibold text-black mb-2">{region.country}</h3>
                    <p className="text-sm text-blue-600 mb-4">{region.agencies}</p>

                    <div className="text-sm text-black">
                      <span className="font-medium">{region.documentsCount} regulatory documents available</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Reports List View */
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedRegion(null)}
                      className="mr-4 text-blue-600 hover:text-blue-700"
                    >
                      <ArrowLeft size={16} className="mr-2" />
                      Back to Regions
                    </Button>
                    <div>
                      <h2 className="text-xl font-bold text-black">{selectedRegionData?.country}</h2>
                      <p className="text-sm text-blue-600">{selectedRegionData?.agencies}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-black">Regulatory Documents</h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                            Document ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                            Size
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedRegionData?.reports.map((report) => (
                          <tr key={report.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                              {report.id}
                            </td>
                            <td className="px-6 py-4 text-sm text-black">{report.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{report.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{report.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                className={
                                  report.status === "Current"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }
                              >
                                {report.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{report.size}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleView(report.id, report.title)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <Eye size={14} className="mr-1" />
                                  View
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDownload(report.id, report.title)}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <Download size={14} className="mr-1" />
                                  Download
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
