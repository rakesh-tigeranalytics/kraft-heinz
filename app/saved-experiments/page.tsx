"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Beaker, Trash2 } from "lucide-react"

interface SavedExperiment {
  id: string
  name: string
  product: string
  testType: string
  dateCreated: string
  billOfMaterials: any[]
  testParameters: any
}

export default function SavedExperiments() {
  const router = useRouter()
  const [savedExperiments, setSavedExperiments] = useState<SavedExperiment[]>([])

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Load saved experiments from localStorage
    const experiments = localStorage.getItem("savedExperiments")
    if (experiments) {
      setSavedExperiments(JSON.parse(experiments))
    }
  }, [router])

  const deleteExperiment = (id: string) => {
    const updatedExperiments = savedExperiments.filter((exp) => exp.id !== id)
    setSavedExperiments(updatedExperiments)
    localStorage.setItem("savedExperiments", JSON.stringify(updatedExperiments))
  }

  const loadExperiment = (experiment: SavedExperiment) => {
    // Navigate back to What If Analyzer with the experiment data
    const params = new URLSearchParams({
      product: experiment.product,
      testType: experiment.testType,
      loadExperiment: experiment.id,
    })
    router.push(`/what-if-analyzer?${params.toString()}`)
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
                  Go Back to Testing
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Saved Experiments</h1>
                  <p className="text-sm text-gray-600">View and manage your saved formulation experiments</p>
                </div>
              </div>
            </div>

            {/* Experiments List */}
            {savedExperiments.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Beaker size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Saved Experiments</h3>
                <p className="text-gray-600 mb-6">
                  You haven't saved any experiments yet. Start by creating an experiment in the What-if Analyzer.
                </p>
                <Button
                  onClick={() => router.push("/testing-outcome-prediction")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Go to Testing
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {savedExperiments.map((experiment) => (
                  <div
                    key={experiment.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 mr-3">{experiment.name}</h3>
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {experiment.testType}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <span className="text-sm text-gray-600">Product:</span>
                            <div className="text-sm font-medium text-gray-900">{experiment.product}</div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Test Type:</span>
                            <div className="text-sm font-medium text-gray-900">{experiment.testType}</div>
                          </div>
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {new Date(experiment.dateCreated).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Materials:</span> {experiment.billOfMaterials.length} components
                          <span className="mx-2">•</span>
                          <span className="font-medium">Parameters:</span>{" "}
                          {Object.keys(experiment.testParameters).length} settings
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Button onClick={() => loadExperiment(experiment)} variant="outline" size="sm">
                          Load Experiment
                        </Button>
                        <Button
                          onClick={() => deleteExperiment(experiment.id)}
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
