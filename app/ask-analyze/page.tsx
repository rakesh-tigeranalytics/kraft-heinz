"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import Header from "@/components/header"

const recentQuestions = [
  {
    id: 1,
    question: "What are the latest trends in sustainable packaging materials?",
    time: "2 hours ago",
  },
  {
    id: 2,
    question: "How do our product absorption rates compare to competitors?",
    time: "Yesterday",
  },
  {
    id: 3,
    question: "What is the correlation between fiber type and product softness?",
    time: "4 days ago",
  },
  {
    id: 4,
    question: "Which raw materials have shown price volatility in the last quarter?",
    time: "5 days ago",
  },
  {
    id: 5,
    question: "What are the regulatory changes affecting our product formulations?",
    time: "1 week ago",
  },
  {
    id: 6,
    question: "How has consumer sentiment changed for eco-friendly products in the last year?",
    time: "1 week ago",
  },
]

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

export default function AskAnalyze() {
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
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: "I'm your R&D Assistant. I can help you analyze data, find insights, and answer questions about your research and development projects. What specific information are you looking for?",
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

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold mr-3">
                  R
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">R&D Assistant</h1>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      R
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">R&D Assistant</h2>
                    <p className="text-gray-600 max-w-md">
                      Hello! I'm your R&D Assistant. How can I help you with your research and development questions
                      today?
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isUser ? "bg-blue-500 text-white" : "bg-white border border-gray-200 text-gray-900"
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
                  placeholder="Ask a question about R&D data..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600">
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>

          <div className="w-80 bg-white border-l border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Most Recently Asked
            </h3>

            <div className="space-y-4">
              {recentQuestions.map((item) => (
                <div key={item.id} className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg -m-2">
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
