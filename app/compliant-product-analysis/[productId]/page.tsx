"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Search,
  Download,
  FileText,
  CheckCircle,
} from "lucide-react";

const compliantProductData = {
  "HG-001-US": {
    id: "HG-001-US",
    name: "HUGGIES Little Snugglers Size 1",
    category: "Baby Care",
    status: "Active",
    region: "United States",
    manufacturer: "kraft-heinz Corporation",
    launchDate: "2021-03-10",
    totalMaterials: 6,
    restrictedMaterials: 0,
    lastUpdated: "2024-01-15",
  },
  "KL-001-US": {
    id: "KL-001-US",
    name: "KLEENEX Ultra Soft Facial Tissues",
    category: "Family Care",
    status: "Active",
    region: "United States",
    manufacturer: "kraft-heinz Corporation",
    launchDate: "2020-08-15",
    totalMaterials: 4,
    restrictedMaterials: 0,
    lastUpdated: "2024-01-14",
  },
  "CT-001-CA": {
    id: "CT-001-CA",
    name: "COTTONELLE Ultra Comfort Toilet Paper",
    category: "Family Care",
    status: "Active",
    region: "Canada",
    manufacturer: "kraft-heinz Corporation",
    launchDate: "2021-11-20",
    totalMaterials: 5,
    restrictedMaterials: 0,
    lastUpdated: "2024-01-13",
  },
  "SC-001-US": {
    id: "SC-001-US",
    name: "SCOTT Paper Towels Choose-A-Sheet",
    category: "Family Care",
    status: "Active",
    region: "United States",
    manufacturer: "kraft-heinz Corporation",
    launchDate: "2020-05-12",
    totalMaterials: 4,
    restrictedMaterials: 0,
    lastUpdated: "2024-01-11",
  },
  "PS-001-US": {
    id: "PS-001-US",
    name: "POISE Ultra Thin Pads",
    category: "Feminine Care",
    status: "Active",
    region: "United States",
    manufacturer: "kraft-heinz Corporation",
    launchDate: "2022-01-08",
    totalMaterials: 7,
    restrictedMaterials: 0,
    lastUpdated: "2024-01-16",
  },
};

const compliantBillOfMaterials = {
  "HG-001-US": [
    {
      material: "Polypropylene",
      casNumber: "9003-07-0",
      percentage: 45.2,
      function: "Top sheet material",
      supplier: "Supplier A",
      status: "Allowed",
    },
    {
      material: "Polyethylene",
      casNumber: "9002-88-4",
      percentage: 28.5,
      function: "Back sheet material",
      supplier: "Supplier B",
      status: "Allowed",
    },
    {
      material: "Super Absorbent Polymer",
      casNumber: "9003-04-7",
      percentage: 20.8,
      function: "Absorbent core",
      supplier: "Supplier C",
      status: "Allowed",
    },
    {
      material: "Cellulose Fiber",
      casNumber: "9004-34-6",
      percentage: 4.2,
      function: "Absorbent layer",
      supplier: "Supplier D",
      status: "Allowed",
    },
    {
      material: "Adhesive Polymer",
      casNumber: "25035-69-2",
      percentage: 1.2,
      function: "Bonding agent",
      supplier: "Supplier E",
      status: "Allowed",
    },
    {
      material: "Elastic Material",
      casNumber: "9003-31-0",
      percentage: 0.1,
      function: "Leg cuffs",
      supplier: "Supplier F",
      status: "Allowed",
    },
  ],
  "KL-001-US": [
    {
      material: "Virgin Wood Pulp",
      casNumber: "65996-61-4",
      percentage: 85.0,
      function: "Primary fiber",
      supplier: "Supplier A",
      status: "Allowed",
    },
    {
      material: "Wet Strength Agent",
      casNumber: "25988-97-0",
      percentage: 12.0,
      function: "Strength enhancement",
      supplier: "Supplier B",
      status: "Allowed",
    },
    {
      material: "Lotion",
      casNumber: "8042-47-5",
      percentage: 2.5,
      function: "Softness",
      supplier: "Supplier C",
      status: "Allowed",
    },
    {
      material: "Colorant",
      casNumber: "1317-33-5",
      percentage: 0.5,
      function: "Coloring",
      supplier: "Supplier D",
      status: "Allowed",
    },
  ],
};

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
];

export default function CompliantProductAnalysis() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;

  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  const product =
    compliantProductData[productId as keyof typeof compliantProductData];
  const billOfMaterials =
    compliantBillOfMaterials[
      productId as keyof typeof compliantBillOfMaterials
    ] || [];

  if (!product) {
    return <div>Product not found</div>;
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
                  <h1 className="text-2xl font-bold text-black">
                    {product.name}
                  </h1>
                  <p className="text-sm text-black">
                    Product Details & Compliance Analysis
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="text-black border-gray-300"
                >
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
              <h3 className="text-lg font-semibold text-black mb-6">
                Product Overview
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Basic Information */}
                <div>
                  <h4 className="text-sm font-semibold text-black mb-4">
                    Basic Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Product ID</span>
                      <p className="text-sm font-medium text-black">
                        {product.id}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Category</span>
                      <p className="text-sm font-medium text-black">
                        {product.category}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        {product.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Manufacturing */}
                <div>
                  <h4 className="text-sm font-semibold text-black mb-4">
                    Manufacturing
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Region</span>
                      <p className="text-sm font-medium text-black">
                        {product.region}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">
                        Manufacturer
                      </span>
                      <p className="text-sm font-medium text-black">
                        {product.manufacturer}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Launch Date</span>
                      <p className="text-sm font-medium text-black">
                        {product.launchDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Compliance Summary */}
                <div>
                  <h4 className="text-sm font-semibold text-black mb-4">
                    Compliance Summary
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">
                        Total Materials
                      </span>
                      <p className="text-sm font-medium text-black">
                        {product.totalMaterials}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">
                        Restricted Materials
                      </span>
                      <p className="text-sm font-medium text-black">
                        {product.restrictedMaterials}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">
                        Last Updated
                      </span>
                      <p className="text-sm font-medium text-black">
                        {product.lastUpdated}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance Alert */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                <div className="flex items-start">
                  <CheckCircle
                    size={20}
                    className="text-green-600 mr-3 mt-0.5"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-green-900 mb-1">
                      Product is Fully Compliant
                    </h4>
                    <p className="text-sm text-green-800">
                      This product contains no restricted materials and meets
                      all regulatory requirements across target markets.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Country Selection */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-black mb-4">
                Regulatory Analysis
              </h3>
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-black">
                  Select Country for Compliance Check:
                </label>
                <Select
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                >
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
                <p className="text-sm text-green-600 mt-2">
                  ✓ Product is compliant with {selectedCountry} regulations
                </p>
              )}
            </div>

            {/* Bill of Materials */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-black">
                    Bill of Materials
                  </h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-black">Total: 100.0%</span>
                    <div className="relative">
                      <Search
                        size={16}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <Input
                        placeholder="Search materials or CAS numbers..."
                        className="pl-10 w-64 text-black"
                      />
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
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {billOfMaterials.map((material, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 bg-green-50 border-l-4 border-green-500"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-medium">
                          {material.material}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                          {material.casNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                          {material.percentage}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                          {material.function}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                          {material.supplier}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {material.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Compliance Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
              <h3 className="text-lg font-semibold text-black mb-4">
                Compliance Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-green-900">
                      Regulatory Status
                    </h4>
                    <CheckCircle size={16} className="text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-900">
                    Compliant
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    All materials approved for use
                  </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-blue-900">
                      Market Access
                    </h4>
                    <CheckCircle size={16} className="text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-900">Global</div>
                  <p className="text-xs text-blue-700 mt-1">
                    Approved for all target markets
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-purple-900">
                      Risk Level
                    </h4>
                    <CheckCircle size={16} className="text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-900">Low</div>
                  <p className="text-xs text-purple-700 mt-1">
                    No regulatory risks identified
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
