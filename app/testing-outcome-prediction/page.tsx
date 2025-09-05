"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BarChart3, FileText } from "lucide-react"

const kraftHeinzProducts = [
  "Kraft Original Mac & Cheese Macaroni and Cheese Dinner, 7.25 oz Box",
  "Kraft Sandwich Spread, 15 Oz Ja",
  "KD Kraft Dinner Vegan Plant Based White Cheddar Macaroni & Cheese, 170g/6 oz",
  "Kraft Chipotle Aioli - 12 fl oz",
  "Kraft Real Mayonnaise 30 fl oz",
  "Heinz 9 Gram Ketchup Packet - 200/Case",
  "Kraft Pimento Spread made with Philadelphia Cream Cheese, Jar",
  "HEINZ Ketchup, Mustard & Relish Picnic Pack- 4pk",
  "Heinz 1 Gallon Apple Cider Vinegar",
  "Heinz 9 Gram Honey Portion Packets - 200/Case"
];


const testTypes = [
  "Shelf Life Stability Test",
  "pH Level Analysis",
  "Viscosity Measurement",
  "Microbial Contamination Test",
  "Nutritional Label Verification",
  "Packaging Integrity Test",
  "Sensory Evaluation (Taste, Texture, Aroma)",
  "Fat and Moisture Content Analysis",
  "Preservative Efficacy Test",
  "Allergen Cross-Contamination Test"
];

const productDetails = {
  "Kraft Original Mac & Cheese Macaroni and Cheese Dinner, 7.25 oz Box": {
    productCode: "KF-001-23",
    category: "Meals",
    formulaNumber: "KF-001-23",
    brandName: "Kraft Foods Inc",
    formulaAttributes: "Classic macaroni with cheese powder",
    consumerDefinition: "Easy-to-make cheesy pasta meal",
    viscosity: "N/A",
    productCategory: "Meals",
    productForm: "Dry Solid",
  },
  "Kraft Sandwich Spread, 15 Oz Ja": {
    productCode: "KF-002-23",
    category: "Condiments",
    formulaNumber: "KF-002-23",
    brandName: "Kraft Foods Inc",
    formulaAttributes: "Mayonnaise-based sandwich spread",
    consumerDefinition: "Creamy spread with tangy flavor",
    viscosity: "Medium",
    productCategory: "Condiments",
    productForm: "Semi-solid",
  },
  "KD Kraft Dinner Vegan Plant Based White Cheddar Macaroni & Cheese, 170g/6 oz": {
    productCode: "KF-003-23",
    category: "Meals",
    formulaNumber: "KF-003-23",
    brandName: "Kraft Foods Inc",
    formulaAttributes: "Plant-based white cheddar pasta",
    consumerDefinition: "Vegan alternative to classic KD",
    viscosity: "N/A",
    productCategory: "Meals",
    productForm: "Dry Solid",
  },
  "Kraft Chipotle Aioli - 12 fl oz": {
    productCode: "KF-004-23",
    category: "Condiments",
    formulaNumber: "KF-004-23",
    brandName: "Kraft Foods Inc",
    formulaAttributes: "Spicy chipotle mayo-based aioli",
    consumerDefinition: "Smoky, creamy condiment for dipping and sandwiches",
    viscosity: "High",
    productCategory: "Condiments",
    productForm: "Liquid",
  },
  "Kraft Real Mayonnaise 30 fl oz": {
    productCode: "KF-005-23",
    category: "Condiments",
    formulaNumber: "KF-005-23",
    brandName: "Kraft Foods Inc",
    formulaAttributes: "Classic real mayonnaise",
    consumerDefinition: "Rich and creamy mayo for versatile use",
    viscosity: "High",
    productCategory: "Condiments",
    productForm: "Liquid",
  },
  "Heinz 9 Gram Ketchup Packet - 200/Case": {
    productCode: "HG-001-23",
    category: "Condiments",
    formulaNumber: "HG-001-23",
    brandName: "Heinz",
    formulaAttributes: "Portion-controlled ketchup packets",
    consumerDefinition: "Convenient ketchup sachets for single use",
    viscosity: "Medium",
    productCategory: "Condiments",
    productForm: "Semi-liquid",
  },
  "Kraft Pimento Spread made with Philadelphia Cream Cheese, Jar": {
    productCode: "KF-006-23",
    category: "Cheese",
    formulaNumber: "KF-006-23",
    brandName: "Kraft Foods Inc",
    formulaAttributes: "Cream cheese and pimento blend",
    consumerDefinition: "Savory cheese spread for crackers or sandwiches",
    viscosity: "Medium",
    productCategory: "Cheese",
    productForm: "Semi-solid",
  },
  "HEINZ Ketchup, Mustard & Relish Picnic Pack- 4pk": {
    productCode: "HG-002-23",
    category: "Condiments",
    formulaNumber: "HG-002-23",
    brandName: "Heinz",
    formulaAttributes: "Assorted condiment pack",
    consumerDefinition: "Essential picnic condiments in one pack",
    viscosity: "Varies",
    productCategory: "Condiments",
    productForm: "Liquid",
  },
  "Heinz 1 Gallon Apple Cider Vinegar": {
    productCode: "HG-003-23",
    category: "Condiments",
    formulaNumber: "HG-003-23",
    brandName: "Heinz",
    formulaAttributes: "Filtered apple cider vinegar",
    consumerDefinition: "Multi-purpose vinegar for cooking and cleaning",
    viscosity: "Low",
    productCategory: "Condiments",
    productForm: "Liquid",
  },
  "Heinz 9 Gram Honey Portion Packets - 200/Case": {
    productCode: "HG-004-23",
    category: "Condiments",
    formulaNumber: "HG-004-23",
    brandName: "Heinz",
    formulaAttributes: "Individual honey servings",
    consumerDefinition: "Sweet honey in convenient packets",
    viscosity: "High",
    productCategory: "Condiments",
    productForm: "Liquid",
  },
};


const billOfMaterials = [
  {
    material: "TOMATO CONCENTRATE FROM RED RIPE TOMATOES",
    percentage: "35.0%",
    function: "Base Ingredient",
    supplier: "Heinz Agriculture Co.",
    cost: "$40.50",
  },
  {
    material: "DISTILLED VINEGAR",
    percentage: "15.0%",
    function: "Acidifier / Preservative",
    supplier: "Pure Vinegars Inc.",
    cost: "$12.75",
  },
  {
    material: "HIGH FRUCTOSE CORN SYRUP",
    percentage: "12.0%",
    function: "Sweetener",
    supplier: "SweetGold Corp.",
    cost: "$9.20",
  },
  {
    material: "CORN SYRUP",
    percentage: "10.0%",
    function: "Sweetener / Texture Enhancer",
    supplier: "Golden Syrups Ltd.",
    cost: "$8.10",
  },
  {
    material: "salt",
    percentage: "6.0%",
    function: "Flavor Enhancer / Preservative",
    supplier: "Morton Salt",
    cost: "$1.80",
  },
  {
    material: "spice",
    percentage: "5.0%",
    function: "Flavoring",
    supplier: "Spice World",
    cost: "$5.60",
  },
  {
    material: "onion powder",
    percentage: "4.5%",
    function: "Flavoring",
    supplier: "Bulk Spices Ltd.",
    cost: "$4.10",
  },
  {
    material: "natural flavoring",
    percentage: "4.0%",
    function: "Aroma / Taste Enhancer",
    supplier: "FlavorTech",
    cost: "$6.30",
  },
  {
    material: "Thickening Agent (INS 415, INS 1422)",
    percentage: "3.5%",
    function: "Stabilizer / Thickener",
    supplier: "Ingredion",
    cost: "$7.90",
  },
  {
    material: "Acidity Regulator (INS 260)",
    percentage: "2.5%",
    function: "pH Control",
    supplier: "FoodSafe Chemicals",
    cost: "$3.20",
  },
  {
    material: "Class II Preservative (INS 211)",
    percentage: "1.5%",
    function: "Shelf Life Extension",
    supplier: "PreserveWell Ltd.",
    cost: "$4.75",
  },
  {
    material: "sugar",
    percentage: "1.0%",
    function: "Sweetener",
    supplier: "Cargill",
    cost: "$2.50",
  }
];

export default function TestingOutcomePrediction() {
  const router = useRouter()
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedTestType, setSelectedTestType] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  const handleLoadFormula = () => {
    console.log("Load Formula clicked")
    console.log("Selected Product:", selectedProduct)
    console.log("Selected Test Type:", selectedTestType)
    console.log("Product exists in details:", !!productDetails[selectedProduct as keyof typeof productDetails])

    if (selectedProduct && selectedTestType) {
      setIsLoading(true)
      setIsLoaded(false) // Reset loaded state first

      // Simulate loading time
      setTimeout(() => {
        console.log("Setting loaded to true")
        setIsLoaded(true)
        setIsLoading(false)
      }, 1500)
    } else {
      console.log("Missing selection - Product:", !!selectedProduct, "Test Type:", !!selectedTestType)
      alert("Please select both Product Name and Test Type before loading.")
    }
  }

  const handleWhatIfAnalyzer = () => {
    if (selectedProduct && selectedTestType) {
      router.push(
        `/what-if-analyzer?product=${encodeURIComponent(selectedProduct)}&testType=${encodeURIComponent(selectedTestType)}`,
      )
    } else {
      console.log("Please select product and test type first")
    }
  }

  const handleViewSavedExperiments = () => {
    router.push("/saved-experiments")
  }

  const currentProductDetails = productDetails[selectedProduct as keyof typeof productDetails] || {
    productCode: "N/A",
    category: "N/A",
    formulaNumber: "N/A",
    brandName: "N/A",
    formulaAttributes: "N/A",
    consumerDefinition: "N/A",
    viscosity: "N/A",
    productCategory: "N/A",
    productForm: "N/A",
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
                  onClick={() => router.push("/product-formulation")}
                  className="mr-4 text-blue-600 hover:text-blue-700"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Testing</h1>
                  <p className="text-sm text-gray-600">
                    Comprehensive safety analysis and testing protocols for formula validation
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={handleViewSavedExperiments}
                  variant="outline"
                  className="text-gray-700 hover:text-gray-900"
                >
                  <FileText size={16} className="mr-2" />
                  View Saved Experiments
                </Button>
                <Button onClick={handleWhatIfAnalyzer} className="bg-gray-800 hover:bg-gray-900 text-white">
                  <BarChart3 size={16} className="mr-2" />
                  What-if Analyzer
                </Button>
              </div>
            </div>

            {/* Formula Selection & Test Configuration */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Formula Selection & Test Configuration</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product..." />
                    </SelectTrigger>
                    <SelectContent>
                      {kraftHeinzProducts.map((product) => (
                        <SelectItem key={product} value={product}>
                          {product}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Test Type</label>
                  <Select value={selectedTestType} onValueChange={setSelectedTestType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select test type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {testTypes.map((testType) => (
                        <SelectItem key={testType} value={testType}>
                          {testType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleLoadFormula}
                  disabled={!selectedProduct || !selectedTestType || isLoading}
                  className={`text-white ${
                    !selectedProduct || !selectedTestType || isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                >
                  {isLoading ? "Loading..." : "Load Formula & Test"}
                </Button>
              </div>
            </div>

            {/* Product Details and Formula Characteristics */}
            {isLoaded && currentProductDetails && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Product Details */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Product Name</span>
                        <span className="text-sm font-medium text-gray-900">{selectedProduct}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Product Code</span>
                        <span className="text-sm font-medium text-gray-900">{currentProductDetails.productCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Category</span>
                        <span className="text-sm font-medium text-gray-900">{currentProductDetails.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Formula Number</span>
                        <span className="text-sm font-medium text-gray-900">{currentProductDetails.formulaNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Brand Name</span>
                        <span className="text-sm font-medium text-gray-900">{currentProductDetails.brandName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Formula Characteristics */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Formula Characteristics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Formula Attributes</span>
                        <span className="text-sm font-medium text-gray-900">
                          {currentProductDetails.formulaAttributes}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Consumer Definition</span>
                        <span className="text-sm font-medium text-gray-900">
                          {currentProductDetails.consumerDefinition}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Viscosity</span>
                        <span className="text-sm font-medium text-gray-900">{currentProductDetails.viscosity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Product Category</span>
                        <span className="text-sm font-medium text-gray-900">
                          {currentProductDetails.productCategory}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Product Form</span>
                        <span className="text-sm font-medium text-gray-900">{currentProductDetails.productForm}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bill of Materials */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Bill of Materials</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Material
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Percentage
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Function
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Supplier
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cost $/Kg
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {billOfMaterials.map((material, index) => (
                          <tr key={index}>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600">{material.material}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{material.percentage}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600">{material.function}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600">{material.supplier}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{material.cost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-4 text-right">
                      <span className="text-sm font-medium text-gray-900">Total: 100.0%</span>
                    </div>
                  </div>
                </div>

                {/* Test Results */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedTestType} Results</h3>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <span className="text-sm text-gray-600">Producer</span>
                      <div className="text-sm font-medium text-gray-900">
                        {selectedProduct.includes("COTTONELLE") ? "COTTONELLE ULTRA COMFORT CARE" : selectedProduct}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Temperature</span>
                      <div className="text-sm font-medium text-gray-900">25°C</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Duration</span>
                      <div className="text-sm font-medium text-gray-900">14 days</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Status</span>
                      <div className="text-sm font-medium text-green-600">✓ Passed with Simulation</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                    <div className="absolute right-0 -top-6 text-sm font-medium text-green-600">100%</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
