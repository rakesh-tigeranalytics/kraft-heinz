"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, RotateCcw, Play, Save } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

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

const initialBillOfMaterials = [
  {
    material: "TOMATO CONCENTRATE FROM RED RIPE TOMATOES",
    percentage: 30.0,
    function: "Base Ingredient",
    supplier: "Heinz Agro Supplies",
  },
  {
    material: "DISTILLED VINEGAR",
    percentage: 20.0,
    function: "Acidifier / Preservative",
    supplier: "Pure Vinegars Ltd.",
  },
  {
    material: "HIGH FRUCTOSE CORN SYRUP",
    percentage: 12.0,
    function: "Sweetener",
    supplier: "Golden Sweeteners Inc.",
  },
  {
    material: "salt",
    percentage: 7.0,
    function: "Flavor Enhancer / Preservative",
    supplier: "Morton Salt Co.",
  },
  {
    material: "CORN SYRUP",
    percentage: 6.5,
    function: "Texture Enhancer / Sweetener",
    supplier: "SweetGold Corp.",
  },
  {
    material: "Thickening Agent (INS 415, INS 1422)",
    percentage: 5.0,
    function: "Stabilizer / Thickener",
    supplier: "Ingredion",
  },
  {
    material: "onion powder",
    percentage: 3.5,
    function: "Flavoring",
    supplier: "Spice World Ingredients",
  },
  {
    material: "spice",
    percentage: 3.0,
    function: "Flavoring Blend",
    supplier: "Global Spices Co.",
  },
  {
    material: "natural flavoring",
    percentage: 2.0,
    function: "Aroma & Taste Enhancer",
    supplier: "FlavorTech Industries",
  },
  {
    material: "Acidity Regulator (INS 260)",
    percentage: 0.8,
    function: "pH Stabilizer",
    supplier: "FoodSafe Chemicals",
  },
  {
    material: "Class II Preservative (INS 211)",
    percentage: 0.7,
    function: "Shelf-Life Enhancer",
    supplier: "PreserveWell Inc.",
  },
  {
    material: "sugar",
    percentage: 0.5,
    function: "Sweetener",
    supplier: "Cargill",
  }
];


const testEnvironmentParameters = {
  "Shelf Life Stability Test": {
    temperature: { value: 25, original: 25, min: 4, max: 40, unit: "°C" },
    humidity: { value: 60, original: 60, min: 30, max: 85, unit: "%" },
    testDuration: { value: 180, original: 180, min: 30, max: 365, unit: "days" },
    lightExposure: { value: 12, original: 12, min: 0, max: 24, unit: "hrs/day" },
  },
  "pH Level Analysis": {
    temperature: { value: 22, original: 22, min: 15, max: 30, unit: "°C" },
    testDuration: { value: 1, original: 1, min: 0.5, max: 2, unit: "hours" },
    phLevel: { value: 4.2, original: 4.2, min: 2.5, max: 7.0, unit: "pH" },
    sampleVolume: { value: 10, original: 10, min: 5, max: 20, unit: "ml" },
  },
  "Viscosity Measurement": {
    temperature: { value: 20, original: 20, min: 15, max: 30, unit: "°C" },
    testDuration: { value: 0.5, original: 0.5, min: 0.25, max: 1, unit: "hours" },
    shearRate: { value: 100, original: 100, min: 10, max: 1000, unit: "s⁻¹" },
    viscosity: { value: 3500, original: 3500, min: 500, max: 8000, unit: "cP" },
  },
  "Microbial Contamination Test": {
    temperature: { value: 37, original: 37, min: 25, max: 45, unit: "°C" },
    humidity: { value: 75, original: 75, min: 60, max: 90, unit: "%" },
    testDuration: { value: 72, original: 72, min: 24, max: 168, unit: "hours" },
    incubation: { value: 3, original: 3, min: 1, max: 5, unit: "days" },
  },
  "Nutritional Label Verification": {
    testDuration: { value: 48, original: 48, min: 24, max: 96, unit: "hours" },
    temperature: { value: 25, original: 25, min: 20, max: 30, unit: "°C" },
    sampleMass: { value: 100, original: 100, min: 50, max: 200, unit: "g" },
    analyzerType: { value: "Mass Spectrometry", original: "Mass Spectrometry", min: null, max: null, unit: "" },
  },
  "Packaging Integrity Test": {
    pressure: { value: 1.2, original: 1.2, min: 0.5, max: 3.0, unit: "bar" },
    dropHeight: { value: 1.0, original: 1.0, min: 0.5, max: 2.0, unit: "meters" },
    testDuration: { value: 8, original: 8, min: 2, max: 24, unit: "hours" },
    temperature: { value: 23, original: 23, min: 10, max: 40, unit: "°C" },
  },
  "Sensory Evaluation (Taste, Texture, Aroma)": {
    panelSize: { value: 10, original: 10, min: 5, max: 25, unit: "people" },
    temperature: { value: 22, original: 22, min: 18, max: 30, unit: "°C" },
    evaluationTime: { value: 30, original: 30, min: 10, max: 60, unit: "minutes" },
    scoringScale: { value: 9, original: 9, min: 5, max: 10, unit: "point scale" },
  },
  "Fat and Moisture Content Analysis": {
    temperature: { value: 105, original: 105, min: 100, max: 110, unit: "°C" },
    testDuration: { value: 4, original: 4, min: 2, max: 8, unit: "hours" },
    sampleMass: { value: 50, original: 50, min: 10, max: 100, unit: "g" },
    fatSolventUsed: { value: "Ether", original: "Ether", min: null, max: null, unit: "" },
  },
  "Preservative Efficacy Test": {
    temperature: { value: 25, original: 25, min: 20, max: 30, unit: "°C" },
    testDuration: { value: 60, original: 60, min: 30, max: 180, unit: "days" },
    microbialLoad: { value: 10, original: 10, min: 5, max: 20, unit: "cfu/g" },
    preservativeConcentration: { value: 0.2, original: 0.2, min: 0.05, max: 1.0, unit: "%" },
  },
  "Allergen Cross-Contamination Test": {
    testDuration: { value: 72, original: 72, min: 24, max: 168, unit: "hours" },
    swabCount: { value: 10, original: 10, min: 5, max: 20, unit: "swabs" },
    temperature: { value: 22, original: 22, min: 18, max: 30, unit: "°C" },
    detectionLimit: { value: 2, original: 2, min: 0.1, max: 5, unit: "ppm" },
  }
};

export default function WhatIfAnalyzer() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [product, setProduct] = useState("")
  const [testType, setTestType] = useState("")
  const [billOfMaterials, setBillOfMaterials] = useState(initialBillOfMaterials)
  const [testParameters, setTestParameters] = useState<any>({})
  const [simulationResult, setSimulationResult] = useState<any>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [experimentName, setExperimentName] = useState("")

  // ─────────────────────────────────────────────
  // Initialize state from query-string (run once)
  // ─────────────────────────────────────────────
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    const productParam = searchParams.get("product")
    const testTypeParam = searchParams.get("testType")
    const loadExperimentId = searchParams.get("loadExperiment")

    if (loadExperimentId) {
      // Load saved experiment
      const savedExperiments = localStorage.getItem("savedExperiments")
      if (savedExperiments) {
        const experiments = JSON.parse(savedExperiments)
        const experiment = experiments.find((exp: any) => exp.id === loadExperimentId)
        if (experiment) {
          setProduct(experiment.product)
          setTestType(experiment.testType)
          setBillOfMaterials(experiment.billOfMaterials)
          setTestParameters(experiment.testParameters)
          return
        }
      }
    }

    if (productParam) setProduct(productParam)

    if (testTypeParam && testEnvironmentParameters[testTypeParam as keyof typeof testEnvironmentParameters]) {
      setTestType(testTypeParam)
      // deep-clone to avoid reference updates
      setTestParameters(
        JSON.parse(JSON.stringify(testEnvironmentParameters[testTypeParam as keyof typeof testEnvironmentParameters])),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // ← run ONLY once

  const totalPercentage = billOfMaterials.reduce((sum, material) => sum + material.percentage, 0)
  const isOverLimit = totalPercentage > 100

  const handlePercentageChange = (index: number, newValue: number[]) => {
    const updatedMaterials = [...billOfMaterials]
    updatedMaterials[index].percentage = newValue[0]
    setBillOfMaterials(updatedMaterials)
  }

  const handleParameterChange = (paramKey: string, newValue: number[]) => {
    setTestParameters((prev: any) => {
      const updated = { ...prev }
      if (updated[paramKey]) {
        updated[paramKey] = {
          ...updated[paramKey],
          value: newValue[0],
        }
      }
      return updated
    })
  }

  const resetBOM = () => {
    setBillOfMaterials(initialBillOfMaterials)
  }

  const runSimulation = () => {
    setIsRunning(true)
    // Simulate running time
    setTimeout(() => {
      setSimulationResult({
        status: "Passed",
        score: Math.floor(Math.random() * 20) + 80,
        details: "Simulation completed successfully with optimized parameters",
      })
      setIsRunning(false)
    }, 3000)
  }

  const saveExperiment = () => {
    if (!product || !testType) {
      alert("Please select both product and test type before saving.")
      return
    }
    setShowSaveDialog(true)
  }

  const handleSaveConfirm = () => {
    if (!experimentName.trim()) {
      alert("Please enter a name for the experiment.")
      return
    }

    const experiment = {
      id: Date.now().toString(),
      name: experimentName.trim(),
      product,
      testType,
      dateCreated: new Date().toISOString(),
      billOfMaterials,
      testParameters,
    }

    // Save to localStorage
    const existingExperiments = localStorage.getItem("savedExperiments")
    const experiments = existingExperiments ? JSON.parse(existingExperiments) : []
    experiments.push(experiment)
    localStorage.setItem("savedExperiments", JSON.stringify(experiments))

    setShowSaveDialog(false)
    setExperimentName("")

    // Navigate to saved experiments page
    router.push("/saved-experiments")
  }

  const handleProductChange = (newProduct: string) => {
    setProduct(newProduct)
  }

  const handleTestTypeChange = (newTestType: string) => {
    if (newTestType === testType) return // no change → no state update

    setTestType(newTestType)

    const params = testEnvironmentParameters[newTestType as keyof typeof testEnvironmentParameters]
    const newParams = params
      ? JSON.parse(JSON.stringify(params))
      : {
          temperature: { value: 25, original: 25, min: 15, max: 50, unit: "°C" },
          humidity: { value: 50, original: 50, min: 30, max: 90, unit: "%" },
          testDuration: { value: 14, original: 14, min: 1, max: 60, unit: "days" },
        }

    setTestParameters((prev) => (JSON.stringify(prev) === JSON.stringify(newParams) ? prev : newParams))
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
                  onClick={() => router.push("/testing-outcome-prediction")}
                  className="mr-4 text-blue-600 hover:text-blue-700"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">What-if Analyzer</h1>
                  <p className="text-sm text-gray-600">Experiment with different formulations and test parameters</p>
                </div>
              </div>
            </div>

            {/* Product and Test Type Selection */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Experiment Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <Select value={product} onValueChange={handleProductChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product..." />
                    </SelectTrigger>
                    <SelectContent>
                      {kraftHeinzProducts.map((productOption) => (
                        <SelectItem key={productOption} value={productOption}>
                          {productOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Test Type</label>
                  <Select value={testType} onValueChange={handleTestTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select test type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {testTypes.map((testTypeOption) => (
                        <SelectItem key={testTypeOption} value={testTypeOption}>
                          {testTypeOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
              {/* Bill of Materials Panel */}
              <div className="lg:col-span-3 bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Bill of Materials</h3>
                  <Button variant="outline" size="sm" onClick={resetBOM}>
                    <RotateCcw size={16} className="mr-2" />
                    Reset BOM
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700 border-b pb-2">
                    <span>Material</span>
                    <span>Percentage</span>
                    <span>Function</span>
                    <span>Supplier</span>
                  </div>

                  {billOfMaterials.map((material, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 items-center">
                      <span className="text-sm text-gray-900">{material.material}</span>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={material.percentage}
                          onChange={(e) => {
                            const updatedMaterials = [...billOfMaterials]
                            updatedMaterials[index].percentage = Number.parseFloat(e.target.value) || 0
                            setBillOfMaterials(updatedMaterials)
                          }}
                          className="w-16 h-8 text-xs"
                          step="0.1"
                        />
                        <span className="text-xs text-gray-500">%</span>
                        <div className="flex-1">
                          <Slider
                            value={[material.percentage]}
                            onValueChange={(value) => handlePercentageChange(index, value)}
                            max={100}
                            min={0}
                            step={0.1}
                            className="w-full"
                          />
                        </div>
                      </div>
                      <span className="text-sm text-blue-600">{material.function}</span>
                      <span className="text-sm text-blue-600">{material.supplier}</span>
                    </div>
                  ))}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Total:</span>
                      <span
                        className={`font-bold ${
                          isOverLimit ? "text-red-600" : totalPercentage === 100 ? "text-green-600" : "text-orange-600"
                        }`}
                      >
                        {totalPercentage.toFixed(1)}%
                      </span>
                    </div>
                    {isOverLimit && (
                      <p className="text-sm text-red-600 mt-2">
                        ⚠️ Total percentage exceeds 100%. Please adjust the values.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Test Environment Parameters Panel */}
              <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Test Environment Parameters</h3>

                <div className="space-y-6">
                  {Object.entries(testParameters).map(([key, param]: [string, any]) => (
                    <div key={key}>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {param.value} {param.unit}
                          </div>
                          <div className="text-xs text-gray-500">
                            Original: {param.original} {param.unit}
                          </div>
                        </div>
                      </div>
                      <Slider
                        value={[param.value]}
                        onValueChange={(value) => handleParameterChange(key, value)}
                        max={param.max}
                        min={param.min}
                        step={param.unit === "°C" || param.unit === "%" ? 1 : 0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>
                          {param.min} {param.unit}
                        </span>
                        <span>
                          {param.max} {param.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mb-8">
              <Button
                onClick={runSimulation}
                disabled={isOverLimit || isRunning}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                <Play size={16} className="mr-2" />
                {isRunning ? "Running Simulation..." : "Run Simulation"}
              </Button>
              <Button onClick={saveExperiment} variant="outline" className="px-8">
                <Save size={16} className="mr-2" />
                Save Experiment
              </Button>
            </div>

            {/* Simulation Results */}
            {simulationResult && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Simulation Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-green-900 mb-1">Status</h4>
                    <div className="text-xl font-bold text-green-900">{simulationResult.status}</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">Performance Score</h4>
                    <div className="text-xl font-bold text-blue-900">{simulationResult.score}/100</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">Details</h4>
                    <div className="text-sm text-gray-700">{simulationResult.details}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Experiment Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Experiment</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="experimentName" className="text-sm font-medium text-gray-700">
              Experiment Name
            </Label>
            <Input
              id="experimentName"
              value={experimentName}
              onChange={(e) => setExperimentName(e.target.value)}
              placeholder="Enter a name for this experiment..."
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveConfirm} className="bg-blue-600 hover:bg-blue-700 text-white">
              Save Experiment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
