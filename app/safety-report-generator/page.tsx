"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, MessageSquare, Plus, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const recentReports = [
  {
    id: "SRG001",
    product: "Kraft Real Mayonnaise 30 fl oz",
    country: "United States",
    status: "Approved",
    date: "2025-05-28",
    approver: "John Smith",
  },
  {
    id: "SRG002",
    product: "HEINZ Ketchup, Mustard & Relish Picnic Pack- 4pk",
    country: "Germany",
    status: "Pending",
    date: "2025-05-27",
    approver: "Pending",
  },
  {
    id: "SRG003",
    product: "Kraft Chipotle Aioli - 12 fl oz",
    country: "Japan",
    status: "Approved",
    date: "2025-05-25",
    approver: "Maria Rodriguez",
  },
  {
    id: "SRG004",
    product: "Kraft Sandwich Spread, 15 Oz Ja",
    country: "Brazil",
    status: "Rejected",
    date: "2025-05-24",
    approver: "David Chen",
  },
  {
    id: "SRG005",
    product: "Heinz 1 Gallon Apple Cider Vinegar",
    country: "Canada",
    status: "Approved",
    date: "2025-05-22",
    approver: "Sarah Johnson",
  },
];


const pendingReports = [
  {
    id: "SRG006",
    product: "KD Kraft Dinner Vegan Plant Based White Cheddar Macaroni & Cheese, 170g/6 oz",
    country: "United Kingdom",
    status: "Pending",
    date: "2025-05-29",
    approver: "Pending",
  },
  {
    id: "SRG007",
    product: "Kraft Pimento Spread made with Philadelphia Cream Cheese, Jar",
    country: "France",
    status: "Pending",
    date: "2025-05-28",
    approver: "Pending",
  },
  {
    id: "SRG008",
    product: "Kraft Original Mac & Cheese Macaroni and Cheese Dinner, 7.25 oz Box",
    country: "Australia",
    status: "Pending",
    date: "2025-05-27",
    approver: "Pending",
  },
  {
    id: "SRG009",
    product: "Heinz 9 Gram Ketchup Packet - 200/Case",
    country: "Mexico",
    status: "Pending",
    date: "2025-05-26",
    approver: "Pending",
  },
  {
    id: "SRG010",
    product: "Heinz 9 Gram Honey Portion Packets - 200/Case",
    country: "Italy",
    status: "Pending",
    date: "2025-05-25",
    approver: "Pending",
  },
  {
    id: "SRG011",
    product: "Kraft Pimento Spread made with Philadelphia Cream Cheese, Jar",
    country: "Spain",
    status: "Pending",
    date: "2025-05-24",
    approver: "Pending",
  },
];

export default function SafetyReportGenerator() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("recent")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{status}</Badge>
      case "Rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{status}</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>
    }
  }

  const handleAskAnalyze = () => {
    router.push("/safety-report-chatbot")
  }

  const handleCreateNewReport = () => {
    router.push("/create-safety-report")
  }

  const currentReports = activeTab === "recent" ? recentReports : pendingReports

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
                  <h1 className="text-2xl font-bold text-black">Safety Report Generator</h1>
                  <p className="text-sm text-black">Generate comprehensive safety reports for regulatory submissions</p>
                </div>
              </div>
            </div>

            {/* Search and Action Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative w-80">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-black"
                />
              </div>
              <div className="flex items-center space-x-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleAskAnalyze}>
                  <MessageSquare size={16} className="mr-2" />
                  Safety & Regulatory Assistant
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleCreateNewReport}>
                  <Plus size={16} className="mr-2" />
                  Create New Report
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-8 border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab("recent")}
                className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "recent"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-black hover:text-gray-700"
                }`}
              >
                Recent Reports
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "pending"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-black hover:text-gray-700"
                }`}
              >
                Pending Approval
              </button>
            </div>

            {/* Reports Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-black">
                  {activeTab === "recent" ? "Recent Safety Reports" : "Pending Safety Reports"}
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Report ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Country
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Approver
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentReports
                      .filter(
                        (report) =>
                          report.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.country.toLowerCase().includes(searchQuery.toLowerCase()),
                      )
                      .map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">{report.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{report.product}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{report.country}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(report.status)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{report.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{report.approver}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                                  View
                                  <ChevronDown size={14} className="ml-1" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="text-black">Download Reports</DropdownMenuItem>
                                <DropdownMenuItem className="text-black">Send Reminder for Approval</DropdownMenuItem>
                                <DropdownMenuItem className="text-black">Withdraw Report</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {currentReports.filter(
                (report) =>
                  report.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  report.country.toLowerCase().includes(searchQuery.toLowerCase()),
              ).length === 0 && (
                <div className="px-6 py-12 text-center">
                  <p className="text-black">No reports found matching your search criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
