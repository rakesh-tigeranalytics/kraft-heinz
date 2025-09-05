"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, ArrowLeft } from "lucide-react"
import Header from "@/components/header"

const recentQuestions = [
  {
    id: 1,
    question: "CAS# 99-76-3 Methylparaben (restricted use) is present in which raw materials?",
    time: "2 hours ago",
  },
  {
    id: 2,
    question: "Who is the supplier supplying raw materials with CAS# 99-76-3?",
    time: "Yesterday",
  },
  {
    id: 3,
    question: "Which are the finished good products which contain CAS# 99-76-3?",
    time: "2 days ago",
  },
  {
    id: 4,
    question:
      "Which supplier is exceeding threshold limit of <10 ppm for CAS# 121-91-(1,4-Dioxane) in raw materials supplied?",
    time: "3 days ago",
  },
  {
    id: 5,
    question:
      'In case, status of CAS# 100-97-0 (Methenamine) changed from "Restricted" to "Prohibited" what will be the revenue impact?',
    time: "4 days ago",
  },
  {
    id: 6,
    question: "What is the RSL latest revision date?",
    time: "1 week ago",
  },
]

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

export default function SafetyReportChatbot() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const question = inputValue.toLowerCase()
    setInputValue("")

    // Simulate AI response with specific answers for regulatory questions
    setTimeout(() => {
      let responseText = ""

      if (question.includes("cas# 99-76-3") && question.includes("raw materials")) {
        responseText =
          "CAS# 99-76-3 Methylparaben is present in the following raw materials: Preservative Blend KC-001 (supplied by Lonza), Antimicrobial Agent KC-205 (supplied by Clariant), and Fragrance Stabilizer KC-340 (supplied by Givaudan). These materials are used in baby wipes, feminine care products, and adult care formulations."
      } else if (question.includes("cas# 99-76-3") && question.includes("supplier")) {
        responseText =
          "The suppliers providing raw materials with CAS# 99-76-3 Methylparaben are: 1) Lonza Group (Primary supplier - Preservative Blend KC-001), 2) Clariant International (Secondary supplier - Antimicrobial Agent KC-205), and 3) Givaudan (Tertiary supplier - Fragrance Stabilizer KC-340). Lonza is our main supplier accounting for 65% of methylparaben-containing materials."
      } else if (question.includes("finished good products") && question.includes("cas# 99-76-3")) {
        responseText =
          "Finished goods containing CAS# 99-76-3 Methylparaben include: HUGGIES Natural Care Baby Wipes, KOTEX Ultra Thin Pads (Regular & Super), DEPEND Silhouette Underwear (Medium & Large), POISE Incontinence Pads (Light & Moderate), and KLEENEX Wet Wipes (Gentle & Antibacterial variants). Total of 12 SKUs across 5 product lines are affected."
      } else if (question.includes("cas# 121-91") && question.includes("threshold limit")) {
        responseText =
          "Supplier exceeding the <10 ppm threshold for CAS# 121-91 (1,4-Dioxane): ChemSource Industries is currently supplying Surfactant Blend CS-450 with 1,4-Dioxane levels at 15.2 ppm, which exceeds our 10 ppm limit. This affects 3 product lines. Corrective action initiated with supplier for reformulation by Q2 2025."
      } else if (question.includes("cas# 100-97-0") && question.includes("revenue impact")) {
        responseText =
          "If CAS# 100-97-0 (Methenamine) status changes from 'Restricted' to 'Prohibited', the estimated revenue impact would be $12.4M annually. This affects 8 product SKUs across Adult Care and Professional segments. Alternative formulations are available but would require 6-8 months for regulatory approval and market transition."
      } else if (question.includes("rsl") && question.includes("revision date")) {
        responseText =
          "The RSL (Restricted Substance List) latest revision date is December 15, 2024 (Version 8.2). The next scheduled review is March 2025. Recent updates included 23 new CAS numbers, revised limits for 12 existing substances, and 3 substances moved from 'Restricted' to 'Prohibited' status."
      } else {
        responseText =
          "I'm your Safety & Regulatory Compliance Assistant. I can help you with CAS number lookups, supplier information, restricted substance lists (RSL), and regulatory impact analysis. What specific compliance question can I help you with today?"
      }

      const aiResponse: Message = {
        id: Date.now() + 1,
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const handleQuestionClick = (question: string) => {
    setInputValue(question)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  onClick={() => router.push("/safety-report-generator")}
                  className="mr-4 text-blue-600 hover:text-blue-700"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Safety Reports
                </Button>
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-semibold mr-3">
                  S
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-black">Safety & Regulatory Assistant</h1>
                  <p className="text-sm text-black">
                    Ask questions about compliance, CAS numbers, and regulatory requirements
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      S
                    </div>
                    <h2 className="text-xl font-semibold text-black mb-2">Safety & Regulatory Assistant</h2>
                    <p className="text-black max-w-md">
                      Hello! I'm your Safety & Regulatory Compliance Assistant. I can help you with CAS number lookups,
                      supplier compliance, restricted substance lists, and regulatory impact analysis.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isUser ? "bg-blue-500 text-white" : "bg-white border border-gray-200 text-black"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about CAS numbers, suppliers, RSL, or regulatory compliance..."
                  className="flex-1 text-black"
                />
                <Button onClick={handleSendMessage} className="bg-green-500 hover:bg-green-600">
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>

          <div className="w-80 bg-white border-l border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Most Recently Asked
            </h3>

            <div className="space-y-4">
              {recentQuestions.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg -m-2"
                  onClick={() => handleQuestionClick(item.question)}
                >
                  <p className="text-sm text-blue-600 hover:text-blue-700 mb-1">{item.question}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
