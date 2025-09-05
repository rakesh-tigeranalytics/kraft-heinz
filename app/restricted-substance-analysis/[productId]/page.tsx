"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Search, Download, FileText, AlertTriangle, ChevronDown } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const productData = {
  "HG-002-EU": {
    id: "HG-002-EU",
    name: "HUGGIES Little Snugglers Size 2",
    category: "Baby Care",
    status: "Active",
    region: "Europe",
    manufacturer: "Kimberly-Clark Corporation",
    launchDate: "2022-04-15",
    totalMaterials: 9,
    restrictedMaterials: 3,
    lastUpdated: "2024-01-15",
  },
}

const billOfMaterials = [
  {
    material: "Polypropylene",
    casNumber: "9003-07-0",
    percentage: 42.5,
    function: "Top sheet material",
    supplier: "Supplier A",
    status: "Allowed",
  },
  {
    material: "Polyethylene",
    casNumber: "9002-88-4",
    percentage: 23.8,
    function: "Back sheet material",
    supplier: "Supplier B",
    status: "Allowed",
  },
  {
    material: "Super Absorbent Polymer",
    casNumber: "9003-04-7",
    percentage: 18.3,
    function: "Absorbent core",
    supplier: "Supplier C",
    status: "Allowed",
  },
  {
    material: "Methylparaben",
    casNumber: "99-76-3",
    percentage: 0.15,
    function: "Preservative",
    supplier: "Supplier D",
    status: "Restricted",
  },
  {
    material: "1,4-Dioxane",
    casNumber: "123-91-1",
    percentage: 0.003,
    function: "Processing aid contaminant",
    supplier: "Supplier E",
    status: "Restricted",
  },
  {
    material: "Formaldehyde",
    casNumber: "50-00-0",
    percentage: 0.002,
    function: "Adhesive component",
    supplier: "Supplier F",
    status: "Restricted",
  },
]

const substitutes = {
  Methylparaben: [
    {
      name: "Phenoxyethanol",
      casNumber: "122-99-6",
      description: "Alternative Preservative",
      details: "Widely accepted preservative with excellent safety profile and regulatory approval across all regions.",
      hazardLevel: "Low",
      costImpact: "Low",
      performanceImpact: "Low",
      compatibility: "High",
      status: "Approved",
    },
    {
      name: "Benzyl Alcohol",
      casNumber: "100-51-6",
      description: "Natural Preservative",
      details: "Natural preservative derived from fruits, offering excellent safety and performance characteristics.",
      hazardLevel: "Low",
      costImpact: "Medium",
      performanceImpact: "Low",
      compatibility: "High",
      status: "Approved",
    },
  ],
  "1,4-Dioxane": [
    {
      name: "Ethylene Oxide Alternative",
      casNumber: "75-21-8",
      description: "Processing Aid",
      details: "Alternative processing aid that eliminates 1,4-Dioxane formation during manufacturing.",
      hazardLevel: "Low",
      costImpact: "Medium",
      performanceImpact: "Low",
      compatibility: "High",
      status: "Approved",
    },
  ],
  Formaldehyde: [
    {
      name: "Polyurethane Adhesive",
      casNumber: "9009-54-5",
      description: "Formaldehyde-free Adhesive",
      details: "High-performance adhesive system that eliminates formaldehyde emissions.",
      hazardLevel: "Low",
      costImpact: "High",
      performanceImpact: "Medium",
      compatibility: "Medium",
      status: "Under Review",
    },
  ],
}

const countries = [
  "United States",
  "Germany",
  "Japan",
  "Brazil",
  "Canada",
  "United Kingdom",
  "France",
  "Australia",
  "Mexico",
  "Italy",
  "Spain",
  "Netherlands",
  "Sweden",
  "South Korea",
  "India",
  "China",
]

const regions = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East & Africa"]

const chartData = [
  { year: 2024, baseline: 800, revenue: 800, net: 800 },
  { year: 2025, baseline: 850, revenue: 820, net: 780 },
  { year: 2026, baseline: 900, revenue: 880, net: 840 },
  { year: 2027, baseline: 950, revenue: 920, net: 880 },
  { year: 2028, baseline: 1000, revenue: 980, net: 940 },
]

export default function RestrictedSubstanceAnalysis() {
  const router = useRouter()
  const params = useParams()
  const productId = params.productId as string

  const [selectedCountry, setSelectedCountry] = useState("")
  const [showSubstitutes, setShowSubstitutes] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState("")
  const [showImpactAnalysis, setShowImpactAnalysis] = useState(false)
  const [selectedSubstitute, setSelectedSubstitute] = useState<any>(null)
  const [productionVolume, setProductionVolume] = useState([2500000])
  const [timePeriod, setTimePeriod] = useState("12 months")
  const [selectedRegion, setSelectedRegion] = useState("Europe")
  const [selectedSubstitutes, setSelectedSubstitutes] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  const product = productData[productId as keyof typeof productData]

  if (!product) {
    return <div>Product not found</div>
  }

  const restrictedMaterials = billOfMaterials.filter((material) => material.status === "Restricted")
  const allowedMaterials = billOfMaterials.filter((material) => material.status === "Allowed")

  const handleFindSubstitute = (materialName: string) => {
    setSelectedMaterial(materialName)
    setShowSubstitutes(true)
  }

  const handleSelectSubstitute = (substitute: any) => {
    setSelectedSubstitutes((prev) => ({
      ...prev,
      [selectedMaterial]: substitute,
    }))
    setShowSubstitutes(false)
    // Don't automatically show impact analysis here
  }

  const getImpactColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateFinancialImpact = () => {
    const volume = productionVolume[0]
    const additionalCosts = volume * 0.0003 // $0.0003 per unit
    const revenueImpact = volume * 0.0008 // $0.0008 per unit
    const netImpact = revenueImpact - additionalCosts

    return {
      additionalCosts: additionalCosts / 1000, // Convert to thousands
      revenueImpact: revenueImpact / 1000,
      netImpact: netImpact / 1000,
    }
  }

  const financialImpact = calculateFinancialImpact()

  if (showImpactAnalysis && selectedSubstitute) {
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
                    onClick={() => setShowImpactAnalysis(false)}
                    className="mr-4 text-blue-600 hover:text-blue-700"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold text-black">{product.name}</h1>
                    <p className="text-sm text-black">Impact Analysis for {selectedSubstitute.name} Substitution</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" className="text-black border-gray-300">
                    <FileText size={16} className="mr-2" />
                    Export Report
                  </Button>
                  <Button
                    onClick={() => {
                      // Save the analysis report
                      const analysisReport = {
                        id: `analysis-${Date.now()}`,
                        productId: product.id,
                        productName: product.name,
                        analysisDate: new Date().toISOString(),
                        selectedSubstitutes: selectedSubstitutes,
                        originalMaterial: selectedMaterial,
                        selectedSubstitute: selectedSubstitute,
                        productionVolume: productionVolume[0],
                        timePeriod: timePeriod,
                        selectedRegion: selectedRegion,
                        financialImpact: financialImpact,
                        status: "Completed",
                      }

                      // Save to localStorage
                      const existingReports = JSON.parse(localStorage.getItem("analysisReports") || "[]")
                      existingReports.push(analysisReport)
                      localStorage.setItem("analysisReports", JSON.stringify(existingReports))

                      // Navigate to saved reports page
                      router.push("/saved-analysis-reports")
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Download size={16} className="mr-2" />
                    Save Analysis
                  </Button>
                </div>
              </div>

              {/* Substitution Summary */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <h3 className="text-lg font-semibold text-black mb-4">Substitution Summary</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <span className="text-sm text-gray-600">Original Material</span>
                    <p className="text-lg font-medium text-black">{selectedMaterial}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Substitute Material</span>
                    <p className="text-lg font-medium text-black">{selectedSubstitute.name}</p>
                  </div>
                </div>
              </div>

              {/* Analysis Parameters */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <h3 className="text-lg font-semibold text-black mb-6">Analysis Parameters</h3>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-black mb-4">Production Volume</label>
                    <div className="space-y-4">
                      <div className="text-center">
                        <span className="text-2xl font-bold text-black">{productionVolume[0].toLocaleString()}</span>
                        <span className="text-sm text-gray-600 ml-2">units</span>
                      </div>
                      <Slider
                        value={productionVolume}
                        onValueChange={setProductionVolume}
                        max={5000000}
                        min={100000}
                        step={100000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>100K</span>
                        <span>5M</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Adjust production volume to see how it affects the financial impact of the substitution.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Analysis Timeframe</label>
                    <Select value={timePeriod} onValueChange={setTimePeriod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6 months">6 months</SelectItem>
                        <SelectItem value="12 months">12 months</SelectItem>
                        <SelectItem value="24 months">24 months</SelectItem>
                        <SelectItem value="36 months">36 months</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-black mb-2">Market Region</label>
                      <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Implementation Timeline</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Target Market:</span>
                        <span className="text-blue-900 font-medium">{selectedRegion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Est. Timeline:</span>
                        <span className="text-blue-900 font-medium">6-8 months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Regulatory Approval:</span>
                        <span className="text-blue-900 font-medium">Required</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Impact Summary */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <h3 className="text-lg font-semibold text-black mb-6">Financial Impact Summary</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-red-900">Additional Costs</h4>
                      <span className="text-xs text-red-700">+8.5%</span>
                    </div>
                    <div className="text-2xl font-bold text-red-900">
                      ${financialImpact.additionalCosts.toFixed(1)}K
                    </div>
                    <p className="text-xs text-red-700 mt-1">Raw material cost increase per year</p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-green-900">Revenue Impact</h4>
                      <span className="text-xs text-green-700">+8.8%</span>
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      ${financialImpact.revenueImpact.toFixed(1)}K
                    </div>
                    <p className="text-xs text-green-700 mt-1">Revenue protection and growth per year</p>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold text-blue-900">Net Impact</h4>
                      <span className="text-xs text-blue-700">+0.3%</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">${financialImpact.netImpact.toFixed(1)}K</div>
                    <p className="text-xs text-blue-700 mt-1">Net financial benefit per year</p>
                  </div>
                </div>
              </div>

              {/* Detailed Analysis */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-black mb-6">Detailed Analysis</h3>

                <div className="flex space-x-6 mb-6">
                  <Button variant="default" size="sm">
                    Revenue Projection
                  </Button>
                </div>

                <div className="mb-4">
                  <h4 className="text-md font-semibold text-black mb-2">Revenue Projection (5 Year)</h4>
                </div>

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
                  onClick={() => router.push("/restricted-substance-list")}
                  className="mr-4 text-blue-600 hover:text-blue-700"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-black">{product.name}</h1>
                  <p className="text-sm text-black">Product Details & Restricted Substance Analysis</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="text-black border-gray-300">
                  <FileText size={16} className="mr-2" />
                  Export Report
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Download size={16} className="mr-2" />
                  Save Analysis
                </Button>
              </div>
            </div>

            {/* Product Overview */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-black mb-6">Product Overview</h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Basic Information */}
                <div>
                  <h4 className="text-sm font-semibold text-black mb-4">Basic Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Product ID</span>
                      <p className="text-sm font-medium text-black">{product.id}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Category</span>
                      <p className="text-sm font-medium text-black">{product.category}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{product.status}</Badge>
                    </div>
                  </div>
                </div>

                {/* Manufacturing */}
                <div>
                  <h4 className="text-sm font-semibold text-black mb-4">Manufacturing</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Region</span>
                      <p className="text-sm font-medium text-black">{product.region}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Manufacturer</span>
                      <p className="text-sm font-medium text-black">{product.manufacturer}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Launch Date</span>
                      <p className="text-sm font-medium text-black">{product.launchDate}</p>
                    </div>
                  </div>
                </div>

                {/* Compliance Summary */}
                <div>
                  <h4 className="text-sm font-semibold text-black mb-4">Compliance Summary</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Total Materials</span>
                      <p className="text-sm font-medium text-black">{product.totalMaterials}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Restricted Materials</span>
                      <p className="text-sm font-medium text-black">{product.restrictedMaterials}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Last Updated</span>
                      <p className="text-sm font-medium text-black">{product.lastUpdated}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning Alert */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
                <div className="flex items-start">
                  <AlertTriangle size={20} className="text-red-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-red-900 mb-1">
                      {product.restrictedMaterials} Restricted Materials Identified
                    </h4>
                    <p className="text-sm text-red-800">
                      This product contains materials that are restricted in certain regions. Review the Bill of
                      Materials below for details and available substitutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Country Selection */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-black mb-4">Regulatory Analysis</h3>
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-black">Select Country for Compliance Check:</label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select country..." />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedCountry && (
                <p className="text-sm text-blue-600 mt-2">
                  Showing compliance status for {selectedCountry} regulations
                </p>
              )}
            </div>

            {/* Bill of Materials */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-black">Bill of Materials</h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-black">Total: 100.0%</span>
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input placeholder="Search materials or CAS numbers..." className="pl-10 w-64 text-black" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Material
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        CAS Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Percentage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Function
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Supplier
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {billOfMaterials.map((material, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-gray-50 ${
                          material.status === "Restricted" ? "bg-red-50 border-l-4 border-red-500" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium">
                          {material.material}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{material.casNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{material.percentage}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{material.function}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{material.supplier}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            className={
                              material.status === "Allowed"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {material.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {material.status === "Restricted" && (
                            <Button
                              onClick={() => handleFindSubstitute(material.material)}
                              variant={selectedSubstitutes[material.material] ? "default" : "outline"}
                              size="sm"
                              className={
                                selectedSubstitutes[material.material]
                                  ? "bg-green-600 hover:bg-green-700 text-white"
                                  : "text-blue-600 border-blue-600 hover:bg-blue-50"
                              }
                            >
                              {selectedSubstitutes[material.material] ? "Change Substitute" : "Find Substitute"}
                              <ChevronDown size={14} className="ml-1" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Analyze Button */}
            {Object.keys(selectedSubstitutes).length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">Selected Substitutes</h3>
                    <p className="text-sm text-gray-600">
                      {Object.keys(selectedSubstitutes).length} substitute(s) selected for analysis
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {Object.entries(selectedSubstitutes).map(([material, substitute]) => (
                        <div key={material} className="bg-blue-50 px-3 py-1 rounded-full text-sm">
                          <span className="text-blue-900 font-medium">{material}</span>
                          <span className="text-blue-700 mx-1">→</span>
                          <span className="text-blue-800">{substitute.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      // Use the first selected substitute for the analysis
                      const firstSubstitute = Object.values(selectedSubstitutes)[0]
                      const firstMaterial = Object.keys(selectedSubstitutes)[0]
                      setSelectedSubstitute(firstSubstitute)
                      setSelectedMaterial(firstMaterial)
                      setShowImpactAnalysis(true)
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                    size="lg"
                  >
                    Analyze Financial Impact
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Substitutes Dialog */}
      <Dialog open={showSubstitutes} onOpenChange={setShowSubstitutes}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Available Substitutes for {selectedMaterial}</DialogTitle>
            <p className="text-sm text-gray-600">
              {substitutes[selectedMaterial as keyof typeof substitutes]?.length || 0} options found
            </p>
          </DialogHeader>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {substitutes[selectedMaterial as keyof typeof substitutes]?.map((substitute, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-black">{substitute.name}</h4>
                    <p className="text-sm text-gray-600">
                      {substitute.casNumber} • {substitute.description}
                    </p>
                  </div>
                  <Badge
                    className={
                      substitute.status === "Approved"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                  >
                    {substitute.status}
                  </Badge>
                </div>

                <p className="text-sm text-black mb-4">{substitute.details}</p>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <span className="text-xs text-gray-600">Hazard Level</span>
                    <div className={`text-xs font-medium px-2 py-1 rounded ${getImpactColor(substitute.hazardLevel)}`}>
                      {substitute.hazardLevel}
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-gray-600">Cost Impact</span>
                    <div className={`text-xs font-medium px-2 py-1 rounded ${getImpactColor(substitute.costImpact)}`}>
                      {substitute.costImpact}
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-gray-600">Performance Impact</span>
                    <div
                      className={`text-xs font-medium px-2 py-1 rounded ${getImpactColor(substitute.performanceImpact)}`}
                    >
                      {substitute.performanceImpact}
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-gray-600">Compatibility</span>
                    <div
                      className={`text-xs font-medium px-2 py-1 rounded ${getImpactColor(substitute.compatibility)}`}
                    >
                      {substitute.compatibility}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" className="text-black border-gray-300">
                    Technical Data
                  </Button>
                  <Button
                    onClick={() => handleSelectSubstitute(substitute)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    Select
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubstitutes(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
