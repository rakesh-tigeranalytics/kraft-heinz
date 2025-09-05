"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Plus,
  Upload,
  Link,
  X,
  Edit,
  Download,
  Printer,
  ChevronDown,
} from "lucide-react";

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
  "China", // Added China
];

// Language mapping for countries
const countryLanguages = {
  "United States": "English",
  Germany: "German",
  Japan: "Japanese",
  Brazil: "Portuguese",
  Canada: "English/French",
  "United Kingdom": "English",
  France: "French",
  Australia: "English",
  Mexico: "Spanish",
  Italy: "Italian",
  Spain: "Spanish",
  Netherlands: "Dutch",
  Sweden: "Swedish",
  "South Korea": "Korean",
  India: "English/Hindi",
  China: "Chinese",
};

const categories = ["Condiments", "Cheese", "Snacks", "Meals", "Frozen foods"];

const kraftProductNames = [
  "Kraft Original Mac & Cheese Macaroni and Cheese Dinner, 7.25 oz Box",
  "Kraft Sandwich Spread, 15 Oz Ja",
  "KD Kraft Dinner Vegan Plant Based White Cheddar Macaroni & Cheese, 170g/6 oz",
  "Kraft Chipotle Aioli - 12 fl oz",
  "Kraft Real Mayonnaise 30 fl oz",
  "Heinz 9 Gram Ketchup Packet - 200/Case",
  "Kraft Pimento Spread made with Philadelphia Cream Cheese, Jar",
  "HEINZ Ketchup, Mustard & Relish Picnic Pack- 4pk",
  "Heinz 1 Gallon Apple Cider Vinegar",
  "Heinz 9 Gram Honey Portion Packets - 200/Case",
];
const brands = [
  "Heinz",
  "Kraft Foods Inc",
  "Grey Poupon",
  "Lea & Perrins",
  "Baker's chocolate",
  "Claussen pickels",
  "Jet-puffed Marshmallows",
  "Lunchables",
  "Gevalia",
];

const productsByCategory = {
  Condiments: kraftProductNames,
  Cheese: kraftProductNames,
  Snacks: kraftProductNames,
  Meals: kraftProductNames,
  // Professional: ["KLEENEX PROFESSIONAL TISSUES", "SCOTT PROFESSIONAL TOWELS"],
  "Frozen foods": kraftProductNames,
};

const brandsByCategory = {
  Condiments: brands,
  Cheese: brands,
  Snacks: brands,
  Meals: brands,
  // Professional: ["KLEENEX PROFESSIONAL TISSUES", "SCOTT PROFESSIONAL TOWELS"],
  "Frozen foods": brands,
};

const brandCodes = {
  Heinz: ["HG-001", "HG-002", "HG-003"],
  // "PULL-UPS": ["PU-001", "PU-002"],
  COTTONELLE: ["CT-001", "CT-002"],
  KOTEX: ["KT-001", "KT-002"],
  DEPEND: ["DP-001", "DP-002"],
  POISE: ["PS-001", "PS-002"],
  KLEENEX: ["KL-001", "KL-002", "KL-003"],
  SCOTT: ["SC-001", "SC-002"],
  VIVA: ["VV-001", "VV-002"],
  // Brands of kraft
  "Kraft Foods Inc": ["KF-001", "KF-002"],
  "Grey Poupon": ["GP-001"],
  "Lea & Perrins": ["LP-001"],
  "Baker's chocolate": ["BC-001"],
  "Claussen pickels": ["CP-001"],
  "Jet-puffed Marshmallows": ["JM-001"],
  Lunchables: ["LU-001"],
  Gevalia: ["GV-001"],
};

// Updated to have all data sources checked by default and include China
const dataSourcesByCountry = {
  "United States": [
    { name: "FDA Safety Assessment Report", checked: true },
    { name: "EPA Environmental Impact Study", checked: true },
    { name: "CPSC Consumer Product Safety Report", checked: true },
    { name: "OSHA Workplace Safety Analysis", checked: true },
  ],
  Germany: [
    { name: "BfR Risk Assessment Report", checked: true },
    { name: "ECHA Chemical Safety Report", checked: true },
    { name: "TÜV Product Safety Certification", checked: true },
  ],
  Japan: [
    { name: "MHLW Safety Evaluation Report", checked: true },
    { name: "NITE Chemical Risk Assessment", checked: true },
    { name: "JIS Safety Standards Compliance", checked: true },
  ],
  Brazil: [
    { name: "ANVISA Product Registration Report", checked: true },
    { name: "IBAMA Environmental Assessment", checked: true },
    { name: "INMETRO Safety Certification", checked: true },
  ],
  Canada: [
    { name: "Health Canada Safety Review", checked: true },
    { name: "Environment Canada Assessment", checked: true },
    { name: "CFIA Product Safety Report", checked: true },
  ],
  "United Kingdom": [
    { name: "MHRA Safety Assessment", checked: true },
    { name: "HSE Risk Evaluation Report", checked: true },
    { name: "BSI Safety Standards Report", checked: true },
  ],
  France: [
    { name: "ANSM Safety Evaluation", checked: true },
    { name: "ANSES Risk Assessment Report", checked: true },
    { name: "AFNOR Safety Certification", checked: true },
  ],
  Australia: [
    { name: "TGA Safety Assessment Report", checked: true },
    { name: "ACCC Product Safety Review", checked: true },
    { name: "Standards Australia Compliance", checked: true },
  ],
  China: [
    { name: "NMPA Safety Assessment Report", checked: true },
    { name: "MEE Environmental Impact Study", checked: true },
    { name: "SAMR Product Safety Certification", checked: true },
    { name: "MIIT Industry Standards Compliance", checked: true },
  ],
};

export default function CreateSafetyReport() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedBrandCode, setSelectedBrandCode] = useState("");
  const [warningStatement, setWarningStatement] = useState("");
  const [useInstructions, setUseInstructions] = useState("");
  const [assessorName, setAssessorName] = useState("");
  const [date, setDate] = useState("");
  const [dataSources, setDataSources] = useState<any[]>([]);

  // Report generation states
  const [showReportPreview, setShowReportPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  // New data source dialog states
  const [showAddDataSourceDialog, setShowAddDataSourceDialog] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const [newDataSourceName, setNewDataSourceName] = useState("");
  const [newDataSourceDescription, setNewDataSourceDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [webUrl, setWebUrl] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (
      selectedCountry &&
      dataSourcesByCountry[selectedCountry as keyof typeof dataSourcesByCountry]
    ) {
      setDataSources([
        ...dataSourcesByCountry[
          selectedCountry as keyof typeof dataSourcesByCountry
        ],
      ]);
    } else {
      setDataSources([]);
    }
  }, [selectedCountry]);

  const handleDataSourceChange = (index: number, checked: boolean) => {
    const updatedSources = [...dataSources];
    updatedSources[index].checked = checked;
    setDataSources(updatedSources);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const addNewDataSource = () => {
    if (!newDataSourceName.trim()) {
      alert("Please enter a data source name");
      return;
    }

    if (uploadMethod === "file" && !selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    if (uploadMethod === "url" && !webUrl.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    const newSource = {
      name: newDataSourceName.trim(),
      checked: true,
      description: newDataSourceDescription.trim(),
      source:
        uploadMethod === "file"
          ? `File: ${selectedFile?.name}`
          : `URL: ${webUrl}`,
      uploadMethod,
    };

    setDataSources([...dataSources, newSource]);

    // Reset form
    setNewDataSourceName("");
    setNewDataSourceDescription("");
    setSelectedFile(null);
    setWebUrl("");
    setShowAddDataSourceDialog(false);
  };

  const removeDataSource = (index: number) => {
    const updatedSources = dataSources.filter((_, i) => i !== index);
    setDataSources(updatedSources);
  };

  const handleGenerateReport = () => {
    if (
      !selectedCountry ||
      !selectedCategory ||
      !selectedProduct ||
      !selectedBrand ||
      !selectedBrandCode
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);

    // Simulate report generation
    setTimeout(() => {
      const language =
        countryLanguages[selectedCountry as keyof typeof countryLanguages];
      const reportId = `SR-${Date.now()}`;

      setGeneratedReport({
        id: reportId,
        country: selectedCountry,
        language,
        product: selectedProduct,
        brand: selectedBrand,
        brandCode: selectedBrandCode,
        category: selectedCategory,
        warningStatement,
        useInstructions,
        assessorName,
        date,
        dataSources: dataSources.filter((source) => source.checked),
        generatedDate: new Date().toISOString(),
      });

      setIsGenerating(false);
      setShowReportPreview(true);
    }, 3000);
  };

  const handleEditDocument = () => {
    alert("Opening document editor...");
  };

  const handleDownload = (format: "pdf" | "word") => {
    alert(`Downloading report as ${format.toUpperCase()}...`);
  };

  const handlePrint = () => {
    alert("Opening print dialog...");
  };

  const handleSendForApproval = () => {
    if (!generatedReport) return;

    // Save to pending reports
    const pendingReport = {
      id: generatedReport.id,
      product: generatedReport.product,
      country: generatedReport.country,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      approver: "Pending",
    };

    // Add to localStorage (simulating database save)
    const existingReports = localStorage.getItem("pendingReports");
    const reports = existingReports ? JSON.parse(existingReports) : [];
    reports.push(pendingReport);
    localStorage.setItem("pendingReports", JSON.stringify(reports));

    alert("Report sent for approval successfully!");

    // Navigate to Safety Report Generator with Pending tab
    router.push("/safety-report-generator?tab=pending");
  };

  const availableProducts = selectedCategory
    ? productsByCategory[selectedCategory as keyof typeof productsByCategory] ||
      []
    : [];
  const availableBrands = selectedCategory
    ? brandsByCategory[selectedCategory as keyof typeof brandsByCategory] || []
    : [];
  const availableBrandCodes = selectedBrand
    ? brandCodes[selectedBrand as keyof typeof brandCodes] || []
    : [];

  if (showReportPreview && generatedReport) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />

        <div className="flex flex-1">
          <Sidebar />

          <div className="flex-1 overflow-auto">
            <div className="p-8">
              {/* Report Preview Header - matching the image */}
              <div className="bg-white border border-gray-200 rounded-lg mb-6">
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      onClick={() => setShowReportPreview(false)}
                      className="mr-4 text-blue-600 hover:text-blue-700"
                    >
                      <ArrowLeft size={16} className="mr-2" />
                      Back
                    </Button>
                    <h1 className="text-lg font-semibold text-black">
                      Preview of Report Draft
                    </h1>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEditDocument}
                      className="text-black border-gray-300 hover:bg-gray-50"
                    >
                      <Edit size={14} className="mr-2" />
                      Edit Document
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrint}
                      className="text-black border-gray-300"
                    >
                      <Printer size={14} className="mr-2" />
                      Print
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-black border-gray-300"
                        >
                          <Download size={14} className="mr-2" />
                          Download
                          <ChevronDown size={14} className="ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleDownload("pdf")}
                          className="text-black"
                        >
                          Download as PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDownload("word")}
                          className="text-black"
                        >
                          Download as Word
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                      onClick={handleSendForApproval}
                      className="bg-green-600 hover:bg-green-700 text-white"
                      size="sm"
                    >
                      Send for Approval
                    </Button>
                  </div>
                </div>
              </div>

              {/* Report Content */}
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="max-w-4xl mx-auto">
                  {/* Report Header */}
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-black mb-2">
                      Safety Assessment Report
                    </h1>
                    <p className="text-lg text-black">
                      {generatedReport.product} - {generatedReport.country}
                    </p>
                    <p className="text-sm text-gray-600">
                      Generated in {generatedReport.language} | Report ID:{" "}
                      {generatedReport.id}
                    </p>
                  </div>

                  {/* Product Information */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-black mb-4">
                      Product Information
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium text-black">
                          Product Name:
                        </span>
                        <p className="text-black">{generatedReport.product}</p>
                      </div>
                      <div>
                        <span className="font-medium text-black">Brand:</span>
                        <p className="text-black">{generatedReport.brand}</p>
                      </div>
                      <div>
                        <span className="font-medium text-black">
                          Brand Code:
                        </span>
                        <p className="text-black">
                          {generatedReport.brandCode}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-black">
                          Category:
                        </span>
                        <p className="text-black">{generatedReport.category}</p>
                      </div>
                    </div>
                  </div>

                  {/* Safety Assessment */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-black mb-4">
                      Safety Assessment
                    </h2>
                    {generatedReport.warningStatement && (
                      <div className="mb-4">
                        <span className="font-medium text-black">
                          Warning Statement:
                        </span>
                        <p className="text-black mt-1">
                          {generatedReport.warningStatement}
                        </p>
                      </div>
                    )}
                    {generatedReport.useInstructions && (
                      <div className="mb-4">
                        <span className="font-medium text-black">
                          Use Instructions:
                        </span>
                        <p className="text-black mt-1">
                          {generatedReport.useInstructions}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Data Sources */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-black mb-4">
                      Referenced Data Sources
                    </h2>
                    <ul className="list-disc list-inside space-y-2">
                      {generatedReport.dataSources.map(
                        (source: any, index: number) => (
                          <li key={index} className="text-black">
                            {source.name}
                            {source.source && (
                              <span className="text-gray-600 ml-2">
                                ({source.source})
                              </span>
                            )}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Assessment Details */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-black mb-4">
                      Assessment Details
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium text-black">
                          Assessor:
                        </span>
                        <p className="text-black">
                          {generatedReport.assessorName || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-black">
                          Assessment Date:
                        </span>
                        <p className="text-black">
                          {generatedReport.date || "Not specified"}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-black">
                          Country/Region:
                        </span>
                        <p className="text-black">{generatedReport.country}</p>
                      </div>
                      <div>
                        <span className="font-medium text-black">
                          Report Language:
                        </span>
                        <p className="text-black">{generatedReport.language}</p>
                      </div>
                    </div>
                  </div>

                  {/* Conclusion */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-black mb-4">
                      Conclusion
                    </h2>
                    <p className="text-black">
                      Based on the comprehensive safety assessment conducted
                      using the referenced data sources, the product{" "}
                      {generatedReport.product} meets the regulatory
                      requirements for {generatedReport.country}. This
                      assessment has been conducted in accordance with local
                      regulatory standards and guidelines.
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="border-t pt-4 text-center text-sm text-gray-600">
                    <p>
                      This report was generated on{" "}
                      {new Date(
                        generatedReport.generatedDate
                      ).toLocaleDateString()}{" "}
                      by the kraft-heinz R&D Safety Report Generator
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                onClick={() => router.push("/safety-report-generator")}
                className="mr-4 text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Safety Reports
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-black">
                  Create New Safety Report
                </h1>
                <p className="text-sm text-black">
                  Generate a comprehensive safety report for regulatory
                  submission
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Panel - Form */}
              <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-black mb-6">
                  Generate Safety Report
                </h3>

                <div className="space-y-6">
                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={selectedCountry}
                      onValueChange={setSelectedCountry}
                    >
                      <SelectTrigger>
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
                    {selectedCountry && (
                      <p className="text-xs text-blue-600 mt-1">
                        Report will be generated in{" "}
                        {
                          countryLanguages[
                            selectedCountry as keyof typeof countryLanguages
                          ]
                        }
                      </p>
                    )}
                  </div>

                  {/* Product Details */}
                  <div>
                    <h4 className="text-md font-semibold text-black mb-4">
                      Product Details
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Category */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={selectedCategory}
                          onValueChange={setSelectedCategory}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category..." />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Product Name */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Product Name <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={selectedProduct}
                          onValueChange={setSelectedProduct}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select product..." />
                          </SelectTrigger>
                          <SelectContent>
                            {availableProducts.map((product) => (
                              <SelectItem key={product} value={product}>
                                {product}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Brand Name */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Brand Name <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={selectedBrand}
                          onValueChange={setSelectedBrand}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select brand..." />
                          </SelectTrigger>
                          <SelectContent>
                            {availableBrands.map((brand) => (
                              <SelectItem key={brand} value={brand}>
                                {brand}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Brand Code */}
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Brand Code <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={selectedBrandCode}
                          onValueChange={setSelectedBrandCode}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select code..." />
                          </SelectTrigger>
                          <SelectContent>
                            {availableBrandCodes.map((code) => (
                              <SelectItem key={code} value={code}>
                                {code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Warning Statement */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Warning Statement
                    </label>
                    <Textarea
                      placeholder="Enter warning statements..."
                      value={warningStatement}
                      onChange={(e) => setWarningStatement(e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Use Instructions */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Use Instructions
                    </label>
                    <Textarea
                      placeholder="Enter use instructions..."
                      value={useInstructions}
                      onChange={(e) => setUseInstructions(e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Assessor and Date */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Assessor's Name
                      </label>
                      <Input
                        placeholder="Enter assessor name..."
                        value={assessorName}
                        onChange={(e) => setAssessorName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Date
                      </label>
                      <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <Button
                      onClick={handleGenerateReport}
                      disabled={isGenerating}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                    >
                      {isGenerating
                        ? "Generating Report..."
                        : "Generate Report"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Panel - Available Data Sources */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-black mb-4">
                  Available Data Sources
                </h3>

                {!selectedCountry ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">📄</div>
                    <p className="text-sm text-gray-600">
                      Select a Country to view available data sources
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dataSources.map((source, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 group"
                      >
                        <Checkbox
                          checked={source.checked}
                          onCheckedChange={(checked) =>
                            handleDataSourceChange(index, checked as boolean)
                          }
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <label className="text-sm text-black leading-relaxed cursor-pointer">
                            {source.name}
                          </label>
                          {source.description && (
                            <p className="text-xs text-gray-500 mt-1">
                              {source.description}
                            </p>
                          )}
                          {source.source && (
                            <p className="text-xs text-blue-600 mt-1">
                              {source.source}
                            </p>
                          )}
                        </div>
                        {source.uploadMethod && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDataSource(index)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700"
                          >
                            <X size={14} />
                          </Button>
                        )}
                      </div>
                    ))}

                    {/* Add New Data Source Button */}
                    <div className="border-t pt-4 mt-4">
                      <Button
                        onClick={() => setShowAddDataSourceDialog(true)}
                        variant="outline"
                        className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        <Plus size={16} className="mr-2" />
                        Add New Data Source
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Data Source Dialog */}
      <Dialog
        open={showAddDataSourceDialog}
        onOpenChange={setShowAddDataSourceDialog}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Data Source</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Data Source Name */}
            <div>
              <Label
                htmlFor="dataSourceName"
                className="text-sm font-medium text-black"
              >
                Data Source Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dataSourceName"
                value={newDataSourceName}
                onChange={(e) => setNewDataSourceName(e.target.value)}
                placeholder="Enter data source name..."
                className="mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <Label
                htmlFor="dataSourceDescription"
                className="text-sm font-medium text-black"
              >
                Description (Optional)
              </Label>
              <Textarea
                id="dataSourceDescription"
                value={newDataSourceDescription}
                onChange={(e) => setNewDataSourceDescription(e.target.value)}
                placeholder="Enter description..."
                rows={2}
                className="mt-1"
              />
            </div>

            {/* Upload Method Selection */}
            <div>
              <Label className="text-sm font-medium text-black mb-3 block">
                Upload Method
              </Label>
              <div className="flex space-x-4">
                <Button
                  variant={uploadMethod === "file" ? "default" : "outline"}
                  onClick={() => setUploadMethod("file")}
                  className="flex-1"
                >
                  <Upload size={16} className="mr-2" />
                  Upload File
                </Button>
                <Button
                  variant={uploadMethod === "url" ? "default" : "outline"}
                  onClick={() => setUploadMethod("url")}
                  className="flex-1"
                >
                  <Link size={16} className="mr-2" />
                  Web URL
                </Button>
              </div>
            </div>

            {/* File Upload */}
            {uploadMethod === "file" && (
              <div>
                <Label
                  htmlFor="fileUpload"
                  className="text-sm font-medium text-black"
                >
                  Select File <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fileUpload"
                  type="file"
                  onChange={handleFileUpload}
                  className="mt-1"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv"
                />
                {selectedFile && (
                  <p className="text-xs text-green-600 mt-1">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
            )}

            {/* Web URL */}
            {uploadMethod === "url" && (
              <div>
                <Label
                  htmlFor="webUrl"
                  className="text-sm font-medium text-black"
                >
                  Web URL <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="webUrl"
                  value={webUrl}
                  onChange={(e) => setWebUrl(e.target.value)}
                  placeholder="https://example.com/document.pdf"
                  className="mt-1"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddDataSourceDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={addNewDataSource}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Data Source
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
