"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ZoomOut } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
} from "recharts";

const categories = [
  "All Categories",
  "Condiments",
  "Cheese",
  "Snacks",
  "Meals",
  "Frozen foods",
];

const regions = [
  "All Regions",
  "North America",
  "Europe",
  "Asia Pacific",
  "Latin America",
  "Middle East & Africa",
];

const expressions = [
  "All Expressions",
  "Health Conscious consumers",
  "New Flavors",
  "Sustainable Packaging",
  "Eco friendly practices",
  "Premium & Artisanal products",
];

const forecastPeriods = [
  "3 Year Out",
  "5 Year Out",
  "7 Year Out",
  "10 Year Out",
];

const manifestationData = [
  {
    id: "all",
    label: "All Categories",
    mentions: "2.1M",
    size: 140,
    x: 50,
    y: 50,
    color: "bg-blue-500",
    keywords: ["flavor", "quality", "nutrition", "convenience"],
  },
  {
    id: "consumer-needs",
    label: "Health Conscious consumers",
    mentions: "480k",
    size: 100,
    x: 25,
    y: 25,
    color: "bg-green-500",
    keywords: ["low-fat", "organic", "plant-based", "non-GMO"],
  },
  {
    id: "sustainability",
    label: "Eco friendly practices",
    mentions: "380k",
    size: 90,
    x: 75,
    y: 30,
    color: "bg-emerald-500",
    keywords: [
      "recyclable",
      "minimal-packaging",
      "local-sourcing",
      "eco-label",
    ],
  },
  {
    id: "smart-products",
    label: "Smart Products",
    mentions: "180k",
    size: 70,
    x: 85,
    y: 15,
    color: "bg-purple-500",
    keywords: ["QR-code", "smart-packaging", "trackable", "freshness-sensor"],
  },
  {
    id: "flushable-wipes",
    label: "Premium & Artisanal products",
    mentions: "170k",
    size: 68,
    x: 85,
    y: 65,
    color: "bg-orange-500",
    keywords: ["gourmet", "small-batch", "handcrafted", "authentic"],
  },
  {
    id: "absorbent-tech",
    label: "No preservatives",
    mentions: "250k",
    size: 80,
    x: 75,
    y: 80,
    color: "bg-red-500",
    keywords: ["clean-label", "natural", "additive-free", "simple-ingredients"],
  },
  {
    id: "trends",
    label: "New Flavors",
    mentions: "255k",
    size: 82,
    x: 15,
    y: 75,
    color: "bg-pink-500",
    keywords: ["spicy", "fusion", "limited-edition", "seasonal"],
  },
  {
    id: "sustainable-materials",
    label: "Sustainable Packaging",
    mentions: "130k",
    size: 65,
    x: 20,
    y: 45,
    color: "bg-teal-500",
    keywords: ["compostable", "bioplastic", "eco-film", "zero-waste"],
  },
];

// Sample data for charts
const salesData = [
  {
    year: 2020,
    historical: 180,
    forecasted: null,
    upperBound: null,
    lowerBound: null,
  },
  {
    year: 2021,
    historical: 210,
    forecasted: null,
    upperBound: null,
    lowerBound: null,
  },
  {
    year: 2022,
    historical: 245,
    forecasted: null,
    upperBound: null,
    lowerBound: null,
  },
  {
    year: 2023,
    historical: 280,
    forecasted: null,
    upperBound: null,
    lowerBound: null,
  },
  {
    year: 2024,
    historical: 320,
    forecasted: null,
    upperBound: null,
    lowerBound: null,
  },
  {
    year: 2025,
    historical: 342,
    forecasted: 342,
    upperBound: 365,
    lowerBound: 320,
  }, // Blue line extends to 2025
  {
    year: 2026,
    historical: null,
    forecasted: 375,
    upperBound: 395,
    lowerBound: 342,
  },
  {
    year: 2027,
    historical: null,
    forecasted: 410,
    upperBound: 425,
    lowerBound: 365,
  },
  {
    year: 2028,
    historical: null,
    forecasted: 425,
    upperBound: 458,
    lowerBound: 392,
  },
];

const manufacturerData = [
  { name: "Hunts", value: 25, color: "#3B82F6" },
  { name: "Primal Kitchen", value: 22, color: "#10B981" },
  { name: "Whataburger", value: 18, color: "#F59E0B" },
  { name: "Del Monte", value: 15, color: "#EF4444" },
  { name: "Red Gold", value: 20, color: "#8B5CF6" },
];


const brandData = [
  { brand: "Hunts Tomato Ketchup 20oz", share: 18.2, color: "#3B82F6" },
  { brand: "Unsweetened Ketchup", share: 22.1, color: "#10B981" },
  { brand: "Spicy Ketchup", share: 12.3, color: "#F59E0B" },
  { brand: "Del Monte Ketchup", share: 8.7, color: "#EF4444" },
  { brand: "G Hughes Sugar Free Ketchup", share: 7.2, color: "#8B5CF6" },
  { brand: "Red Gold Tomato Ketchup", share: 6.4, color: "#06B6D4" },
  { brand: "Extra Veggie Ketchup", share: 4.2, color: "#EC4899" },
  { brand: "Fancy Ketchup", share: 3.1, color: "#10B981" },
  { brand: "Best Ever Tomato Ketchup", share: 2.8, color: "#F97316" },
  { brand: "Organic & Unsweetened Ketchup", share: 2.5, color: "#6B7280" },
];


export default function EmergingTrends() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("manifestation");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedExpression, setSelectedExpression] = useState(
    "New Flavors"
  );
  const [selectedForecastPeriod, setSelectedForecastPeriod] =
    useState("3 Year Out");
  const [zoomedBubble, setZoomedBubble] = useState<string | null>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  const handleBubbleClick = (bubbleId: string) => {
    setZoomedBubble(bubbleId);
  };

  const handleZoomOut = () => {
    setZoomedBubble(null);
  };

  const zoomedData = manifestationData.find((item) => item.id === zoomedBubble);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Tab Navigation */}
            <div className="mb-8">
              <div className="flex space-x-8 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("manifestation")}
                  className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "manifestation"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Manifestation & Network Maps
                </button>
                <button
                  onClick={() => setActiveTab("lifecycle")}
                  className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "lifecycle"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Lifecycle Matrix
                </button>
                <button
                  onClick={() => setActiveTab("expression")}
                  className={`pb-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "expression"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Expression Opportunity Deep Dive
                </button>
              </div>
            </div>

            {/* Manifestation Map View */}
            {activeTab === "manifestation" && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Manifestation Map
                  </h1>
                  <p className="text-gray-600 mb-6">
                    Visual representation of how food product trends manifest
                    across different categories and consumer-focused keywords.
                  </p>

                  {/* Filters */}
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">
                        Filter by Category:
                      </label>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
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

                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">
                        Regional Adoption:
                      </label>
                      <Select
                        value={selectedRegion}
                        onValueChange={setSelectedRegion}
                      >
                        <SelectTrigger className="w-48">
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

                    <div className="text-sm text-blue-600">
                      Click on any bubble to zoom in
                    </div>
                  </div>
                </div>

                {/* Manifestation Visualization */}
                <div className="space-y-8">
                  {/* Main Network Map */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100  rounded-lg border border-gray-200 p-8 h-[600px] relative overflow-hidden">
                    {!zoomedBubble ? (
                      // Network Map View
                      <div className="relative w-full h-full">
                        <svg className="w-full h-full">
                          {/* Connection Lines */}
                          {manifestationData
                            .filter((item) => item.id !== "all")
                            .map((item) => {
                              const centerBubble = manifestationData.find(
                                (b) => b.id === "all"
                              );
                              if (!centerBubble) return null;
                              return (
                                <line
                                  key={`line-${item.id}`}
                                  x1={`${centerBubble.x}%`}
                                  y1={`${centerBubble.y}%`}
                                  x2={`${item.x}%`}
                                  y2={`${item.y}%`}
                                  stroke="#9ca3af"
                                  strokeWidth="2"
                                  strokeDasharray="8,4"
                                />
                              );
                            })}
                        </svg>

                        {/* Bubbles */}
                        {manifestationData.map((item) => (
                          <div
                            key={item.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-105 transition-transform"
                            style={{
                              left: `${item.x}%`,
                              top: `${item.y}%`,
                            }}
                            onClick={() => handleBubbleClick(item.id)}
                          >
                            {/* All nodes now have similar oval shape with different colors */}
                            <div
                              className={`${item.color} text-white rounded-full shadow-lg flex flex-col items-center justify-center`}
                              style={{
                                width: `${item.size}px`,
                                height: `${item.size * 0.7}px`,
                                minWidth: "90px",
                                minHeight: "76px",
                              }}
                            >
                              <div className="text-xs font-bold text-center px-2 leading-tight">
                                {item.label}
                              </div>
                              <div className="text-xs font-medium">
                                {item.mentions}
                              </div>
                              <div className="text-xs opacity-75">mentions</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Zoomed View - Similar network structure
                      <div className="relative w-full h-full">
                        <Button
                          onClick={handleZoomOut}
                          className="absolute top-4 right-4 bg-white text-gray-700 hover:bg-gray-50 shadow-md z-10"
                          size="sm"
                        >
                          <ZoomOut size={16} className="mr-2" />
                          Zoom Out
                        </Button>

                        {zoomedData && (
                          <div className="relative w-full h-full">
                            <svg className="w-full h-full">
                              {/* Connection lines from center to keywords */}
                              {zoomedData.keywords.map((_, index) => {
                                const angle =
                                  (index * 360) / zoomedData.keywords.length;
                                const x =
                                  50 + 30 * Math.cos((angle * Math.PI) / 180);
                                const y =
                                  50 + 30 * Math.sin((angle * Math.PI) / 180);
                                return (
                                  <line
                                    key={`zoom-line-${index}`}
                                    x1="50%"
                                    y1="50%"
                                    x2={`${x}%`}
                                    y2={`${y}%`}
                                    stroke="#9ca3af"
                                    strokeWidth="2"
                                    strokeDasharray="8,4"
                                  />
                                );
                              })}
                            </svg>

                            {/* Central bubble */}
                            <div
                              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${zoomedData.color} text-white rounded-full shadow-lg flex flex-col items-center justify-center`}
                              style={{
                                left: "50%",
                                top: "50%",
                                width: "160px",
                                height: "112px",
                              }}
                            >
                              <div className="text-lg font-bold text-center">
                                {zoomedData.label}
                              </div>
                              <div className="text-sm text-center">
                                {zoomedData.mentions}
                              </div>
                              <div className="text-xs text-center opacity-75">
                                mentions
                              </div>
                            </div>

                            {/* Keyword bubbles positioned around center */}
                            {zoomedData.keywords.map((keyword, index) => {
                              const angle =
                                (index * 360) / zoomedData.keywords.length;
                              const x =
                                50 + 30 * Math.cos((angle * Math.PI) / 180);
                              const y =
                                50 + 30 * Math.sin((angle * Math.PI) / 180);
                              const colors = [
                                "bg-blue-400",
                                "bg-green-400",
                                "bg-purple-400",
                                "bg-orange-400",
                              ];
                              return (
                                <div
                                  key={keyword}
                                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                                    colors[index % colors.length]
                                  } text-white rounded-full shadow-md cursor-pointer hover:scale-105 transition-transform flex flex-col items-center justify-center`}
                                  style={{
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    width: "100px",
                                    height: "70px",
                                  }}
                                >
                                  <div className="text-xs font-bold text-center px-1 leading-tight">
                                    {keyword}
                                  </div>
                                  <div className="text-xs font-medium">
                                    {Math.floor(Math.random() * 50) + 10}k
                                  </div>
                                  <div className="text-xs opacity-75">
                                    mentions
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Key Manifestations and Network Connections */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Key Manifestations */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Key Manifestations
                      </h3>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>
                            <strong>Sustainability</strong> emerges as a
                            dominant trend in food products with{" "}
                            <strong>456k social media mentions</strong>,
                            especially around packaging and ingredient sourcing.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>
                            Consumer preferences around{" "}
                            <strong>organic snacks and clean labels</strong>{" "}
                            remain key drivers, with{" "}
                            <strong>485k+ social mentions</strong> across
                            multiple food segments.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>
                            <strong>"Plant-based"</strong> registers the highest
                            keyword volume, with{" "}
                            <strong>210k social mentions</strong> spanning
                            cheese alternatives, snacks, and frozen meals.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>
                            Smart food innovations are gaining momentum with
                            increased interest in{" "}
                            <strong>
                              QR code traceability and freshness indicators
                            </strong>
                            .
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>
                            Artisanal and gourmet products, especially{" "}
                            <strong>aged cheeses and premium condiments</strong>
                            , show growing demand and innovation potential.
                          </span>
                        </li>
                      </ul>
                    </div>

                    {/* Network Connections */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Network Connections
                      </h3>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>
                            <strong>Strong correlation</strong> between
                            sustainability discussions and food category
                            engagement <strong>(0.87)</strong>, particularly in
                            frozen meals and ready-to-eat segments.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>
                            <strong>"Organic snacks"</strong> appears across
                            multiple segments, showing{" "}
                            <strong>cross-category relevance</strong> for
                            health-conscious consumers.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>
                            Plant-based keywords frequently co-occur with{" "}
                            <strong>
                              dairy-free cheese and meat alternatives (78%)
                            </strong>
                            .
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>
                            Smart packaging trends are influencing{" "}
                            <strong>
                              supply chain transparency and freshness assurance
                            </strong>
                            .
                          </span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>
                            Consumer appetite for{" "}
                            <strong>premium condiments</strong> aligns with
                            increased demand for{" "}
                            <strong>simple, high-quality ingredients</strong>.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Regional Adoption Heat Map */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                      Regional Adoption Heat Map
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {[
                        {
                          region: "North America",
                          level: "High Adoption",
                          color: "bg-red-200",
                          borderColor: "border-red-500",
                        },
                        {
                          region: "Europe",
                          level: "Very High",
                          color: "bg-orange-200",
                          borderColor: "border-orange-500",
                        },
                        {
                          region: "Asia Pacific",
                          level: "Medium",
                          color: "bg-yellow-200",
                          borderColor: "border-yellow-500",
                        },
                        {
                          region: "Latin America",
                          level: "Growing",
                          color: "bg-green-200",
                          borderColor: "border-green-500",
                        },
                        {
                          region: "Middle East & Africa",
                          level: "Emerging",
                          color: "bg-blue-200",
                          borderColor: "border-blue-500",
                        },
                      ].map((item) => (
                        <div
                          key={item.region}
                          className={`${item.color} rounded-lg p-4 h-32 flex flex-col justify-between border-b-4 ${item.borderColor}`}
                        >
                          <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-sm font-semibold text-gray-900">
                                {item.region}
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs font-medium text-gray-700">
                              {item.level}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Lifecycle Matrix View */}
            {activeTab === "lifecycle" && (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Current vs Forecasted Lifecycle Matrix
                  </h1>
                  <p className="text-gray-600 mb-6">
                    Visualizing the progression of expressions through lifecycle
                    stages
                  </p>

                  {/* Filters */}
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">
                        Filter by Category:
                      </label>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
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

                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">
                        Regional Adoption:
                      </label>
                      <Select
                        value={selectedRegion}
                        onValueChange={setSelectedRegion}
                      >
                        <SelectTrigger className="w-48">
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

                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">
                        Expressions:
                      </label>
                      <Select value="All Expressions" onValueChange={() => {}}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Expressions">
                            All Expressions
                          </SelectItem>
                          <SelectItem value="Health Conscious consumers">
                            Health Conscious consumers
                          </SelectItem>
                          <SelectItem value="New Flavors">
                            New Flavors
                          </SelectItem>
                          <SelectItem value="Sustainable Packaging">
                            Sustainable Packaging
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Matrix Legend */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                      Matrix Legend
                    </h3>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-200 rounded"></div>
                        <span className="text-sm text-gray-700">
                          Low Opportunity
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                        <span className="text-sm text-gray-700">
                          Medium Opportunity
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-200 rounded"></div>
                        <span className="text-sm text-gray-700">
                          High Opportunity
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Lifecycle Matrix */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-5 divide-x divide-gray-200">
                      {/* Header Row */}
                      <div className="bg-gray-50 p-4 font-semibold text-sm text-gray-900">
                        <div className="text-center">Current Lifecycle</div>
                        <div className="text-right mt-2 text-xs text-gray-600">
                          Forecasted Lifecycle
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 text-center font-semibold text-sm text-blue-900">
                        Introduction
                      </div>
                      <div className="bg-yellow-50 p-4 text-center font-semibold text-sm text-yellow-900">
                        Growth
                      </div>
                      <div className="bg-green-50 p-4 text-center font-semibold text-sm text-green-900">
                        Maturity
                      </div>
                      <div className="bg-red-50 p-4 text-center font-semibold text-sm text-red-900">
                        Decline
                      </div>

                      {/* Introduction Row */}
                      <div className="bg-blue-50 p-4 font-semibold text-sm text-blue-900">
                        Introduction
                      </div>
                      <div className="bg-green-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          2
                        </div>
                        <div className="text-xs text-gray-600">expressions</div>
                        <div className="text-xs text-blue-600 font-medium mt-1">
                          Natural Progression
                        </div>
                      </div>
                      <div className="bg-yellow-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          3
                        </div>
                        <div className="text-xs text-gray-600">expressions</div>
                        <div className="text-xs text-blue-600 font-medium mt-1">
                          Accelerated Growth
                        </div>
                      </div>
                      <div className="bg-yellow-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          1
                        </div>
                        <div className="text-xs text-gray-600">expressions</div>
                        <div className="text-xs text-blue-600 font-medium mt-1">
                          Accelerated Growth
                        </div>
                      </div>
                      <div className="bg-red-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          0
                        </div>
                        <div className="text-xs text-gray-600">expressions</div>
                        <div className="text-xs text-red-600 font-medium mt-1">
                          Rapid Obsolescence
                        </div>
                      </div>

                      {/* Growth Row */}
                      <div className="bg-yellow-50 p-4 font-semibold text-sm text-yellow-900">
                        Growth
                      </div>
                      <div className="bg-red-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          0
                        </div>
                        <div className="text-xs text-gray-600">expressions</div>
                        <div className="text-xs text-red-600 font-medium mt-1">
                          Regression
                        </div>
                      </div>
                      <div className="bg-green-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          1
                        </div>
                        <div className="text-xs text-gray-600">expressions</div>
                        <div className="text-xs text-blue-600 font-medium mt-1">
                          Natural Progression
                        </div>
                      </div>
                      <div className="bg-green-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          2
                        </div>
                        <div className="text-xs text-gray-600">expressions</div>
                        <div className="text-xs text-blue-600 font-medium mt-1">
                          Natural Progression
                        </div>
                      </div>
                      <div className="bg-yellow-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          0
                        </div>
                        <div className="text-xs text-gray-600">expressions</div>
                        <div className="text-xs text-orange-600 font-medium mt-1">
                          Accelerated Decline
                        </div>
                      </div>

                      {/* Maturity Row */}
                      <div className="bg-green-50 p-4 font-semibold text-sm text-green-900">
                        Maturity
                      </div>
                      <div className="bg-red-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          0
                        </div>
                        <div className="text-xs text-gray-600">expressions</div>
                        <div className="text-xs text-red-600 font-medium mt-1">
                          Major Disruption
                        </div>
                      </div>
                      <div className="bg-red-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          0
                        </div>
                        <div className="text-xs text-gray-600">expressions</div>
                        <div className="text-xs text-red-600 font-medium mt-1">
                          Regression
                        </div>
                      </div>
                      <div className="bg-green-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          1
                        </div>
                        <div className="text-xs text-gray-600">expressions</div>
                        <div className="text-xs text-blue-600 font-medium mt-1">
                          Natural Progression
                        </div>
                      </div>
                      <div className="bg-yellow-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          1
                        </div>
                        <div className="text-xs text-gray-600">expressions</div>
                        <div className="text-xs text-blue-600 font-medium mt-1">
                          Natural Progression
                        </div>
                      </div>

                      {/* Decline Row */}
                      <div className="bg-red-50 p-4 font-semibold text-sm text-red-900">
                        Decline
                      </div>
                      <div className="bg-red-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          0
                        </div>
                        <div className="text-xs text-gray-600">expressions</div>
                        <div className="text-xs text-red-600 font-medium mt-1">
                          Major Disruption
                        </div>
                      </div>
                      <div className="bg-red-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          0
                        </div>
                        <div className="text-xs text-gray-600">expressions</div>
                        <div className="text-xs text-red-600 font-medium mt-1">
                          Major Disruption
                        </div>
                      </div>
                      <div className="bg-yellow-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          1
                        </div>
                        <div className="text-xs text-gray-600">expressions</div>
                        <div className="text-xs text-blue-600 font-medium mt-1">
                          Revitalization
                        </div>
                      </div>
                      <div className="bg-blue-200 p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          1
                        </div>
                        <div className="text-xs text-gray-600">expressions</div>
                        <div className="text-xs text-purple-600 font-medium mt-1">
                          Innovation
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Lifecycle Analysis Table */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Detailed Lifecycle Analysis
                      </h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Expression
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Current Lifecycle
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Forecasted Lifecycle
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              CAGR
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Forecast Sales
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Manufacturer's Share
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Condiment
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Health Conscious consumers
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Growth
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                Maturity
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                              +28.3%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              $285.6M
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              15.2%
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Condiment
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              New Flavors
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                Maturity
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                Decline
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                              -8.7%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              $142.8M
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              12.8%
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Condiment
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Sustainable Packaging
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                Introduction
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Growth
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                              +42.5%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              $198.4M
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              8.9%
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Condiment
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Eco friendly practices
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                Introduction
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Growth
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                              +35.2%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              $78.4M
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              6.4%
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Condiment
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Premium & Artisanal products
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                Decline
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                End of Life
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                              -12.4%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              $45.2M
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              4.1%
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Condiment
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              No preservatives
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                Introduction
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Growth
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                              -5.4%
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              $49.2M
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              5.1%
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Lifecycle Transition Recommendations */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                      Lifecycle Transition Recommendations
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                        <h4 className="text-sm font-semibold text-blue-900 mb-2">
                          Introduction → Growth
                        </h4>
                        <p className="text-sm text-blue-800">
                          Highlight unique ingredients or nutritional benefits
                          in marketing. Conduct sampling campaigns, secure early
                          retail placements, and build awareness for new flavor
                          profiles or formats.
                        </p>
                      </div>

                      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                        <h4 className="text-sm font-semibold text-green-900 mb-2">
                          Growth → Maturity
                        </h4>
                        <p className="text-sm text-green-800">
                          Expand distribution, introduce new pack sizes or
                          limited-edition flavors, and focus on brand
                          differentiation. Use data insights to target specific
                          consumer segments and optimize shelf positioning.
                        </p>
                      </div>

                      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                        <h4 className="text-sm font-semibold text-orange-900 mb-2">
                          Maturity → Decline
                        </h4>
                        <p className="text-sm text-orange-800">
                          Streamline product lines, reduce underperforming SKUs,
                          and increase promotional efforts. Evaluate bundling
                          opportunities or co-branding with complementary
                          products to sustain interest.
                        </p>
                      </div>

                      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                        <h4 className="text-sm font-semibold text-purple-900 mb-2">
                          Decline → Revitalization
                        </h4>
                        <p className="text-sm text-purple-800">
                          Consider reformulating recipes with cleaner labels,
                          introducing sustainable packaging, or repositioning
                          products toward emerging health-conscious trends.
                          Explore nostalgia marketing or rebranding.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Expression Opportunity Deep Dive View */}
            {activeTab === "expression" && (
              <div>
                <div className="mb-6">
                  {/* Filters */}
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">
                        Filter by Category:
                      </label>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
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

                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">
                        Regional Adoption:
                      </label>
                      <Select
                        value={selectedRegion}
                        onValueChange={setSelectedRegion}
                      >
                        <SelectTrigger className="w-48">
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

                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">
                        Expressions:
                      </label>
                      <Select
                        value={selectedExpression}
                        onValueChange={setSelectedExpression}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {expressions.map((expression) => (
                            <SelectItem key={expression} value={expression}>
                              {expression}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">
                        Forecast Period:
                      </label>
                      <Select
                        value={selectedForecastPeriod}
                        onValueChange={setSelectedForecastPeriod}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {forecastPeriods.map((period) => (
                            <SelectItem key={period} value={period}>
                              {period}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                          {selectedExpression}
                        </h1>
                        <p className="text-gray-600 mb-4">
                          Consumer expressions driving trends in quality and sustainability
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">
                              Market Potential:
                            </div>
                            <div className="text-sm font-semibold text-gray-900">
                              Very High
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">
                              Development Time:
                            </div>
                            <div className="text-sm font-semibold text-gray-900">
                              8-12 months
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">
                              Lifecycle:
                            </div>
                            <div className="text-sm font-semibold text-green-600">
                              Growth
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">
                              Forecast:
                            </div>
                            <div className="text-sm font-semibold text-gray-900">
                              {selectedForecastPeriod}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        High Impact
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Sales Forecast Chart */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Sales forecast for {selectedCategory} {selectedExpression}
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Historical data and forecasted projections with confidence
                      intervals
                    </p>

                    <div className="h-80 mb-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis tickFormatter={(value) => `$${value}M`} />
                          <Tooltip formatter={(value) => [`$${value}M`, ""]} />
                          <ReferenceLine
                            x={2025}
                            stroke="#EF4444"
                            strokeDasharray="8 4"
                            label={{ value: "Forecast Start", position: "top" }}
                          />
                          <Line
                            type="monotone"
                            dataKey="historical"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                            connectNulls={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="forecasted"
                            stroke="#10B981"
                            strokeWidth={3}
                            dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                            connectNulls={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="upperBound"
                            stroke="#10B981"
                            strokeWidth={1}
                            strokeDasharray="5 5"
                            dot={false}
                            connectNulls={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="lowerBound"
                            stroke="#10B981"
                            strokeWidth={1}
                            strokeDasharray="5 5"
                            dot={false}
                            connectNulls={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Metric Tiles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-blue-900 mb-1">
                          Historical Growth
                        </h4>
                        <div className="text-lg font-bold text-blue-900">
                          CAGR +32.5%
                        </div>
                        <div className="text-xs text-blue-700">(2020-2024)</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-green-900 mb-1">
                          Forecast Growth
                        </h4>
                        <div className="text-lg font-bold text-green-900">
                          CAGR +24.1%
                        </div>
                        <div className="text-xs text-green-700">
                          (2025-2028)
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-purple-900 mb-1">
                          Market Potential
                        </h4>
                        <div className="text-lg font-bold text-purple-900">
                          Peak $425.8M
                        </div>
                        <div className="text-xs text-purple-700">by 2030</div>
                      </div>
                    </div>
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Manufacturer Share Donut Chart */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        Top Manufacturers Share
                      </h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={manufacturerData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={5}
                              dataKey="value"
                              label={({ value }) => `${value}%`}
                              labelLine={false}
                            >
                              {manufacturerData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => [
                                `${value}%`,
                                "Market Share",
                              ]}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex flex-wrap justify-center gap-4 mt-4">
                        {manufacturerData.map((entry, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            ></div>
                            <span className="text-sm text-gray-700">
                              {entry.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Top 10 Brands Market Share Custom Chart */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        Top 10 Brands Market Share
                      </h3>

                      <div className="space-y-3">
                        {brandData.map((brand, index) => (
                          <div key={brand.brand} className="flex items-center">
                            <div className="w-20 text-right text-sm text-gray-700 mr-4 flex-shrink-0">
                              {brand.brand}
                            </div>
                            <div className="flex-1 relative">
                              <div className="bg-gray-100 h-6 rounded-sm relative overflow-hidden">
                                <div
                                  className="h-full rounded-sm flex items-center justify-end pr-2"
                                  style={{
                                    backgroundColor: brand.color,
                                    width: `${(brand.share / 25) * 100}%`,
                                  }}
                                >
                                  <span className="text-xs font-medium text-white">
                                    {brand.share}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* X-axis labels */}
                      <div className="flex justify-between text-xs text-gray-500 mt-4 ml-24">
                        <span>0%</span>
                        <span>5%</span>
                        <span>10%</span>
                        <span>15%</span>
                        <span>20%</span>
                        <span>25%</span>
                      </div>
                    </div>
                  </div>

                  {/* Forecast Period Details */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Forecast Period Details
                    </h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Detailed forecast metrics and manufacturer opportunity
                      simulation
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-blue-900 mb-1">
                          Current Lifecycle
                        </h4>
                        <div className="text-xl font-bold text-blue-900">
                          Growth
                        </div>
                        <div className="text-xs text-blue-700">
                          Market expansion phase
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-green-900 mb-1">
                          Forecast Lifecycle
                        </h4>
                        <div className="text-xl font-bold text-green-900">
                          Maturity
                        </div>
                        <div className="text-xs text-green-700">
                          Projected to 2028
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-yellow-900 mb-1">
                          CAGR Forecast Period
                        </h4>
                        <div className="text-xl font-bold text-yellow-900">
                          +24.1%
                        </div>
                        <div className="text-xs text-yellow-700">
                          2025-2028 compound growth
                        </div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-orange-900 mb-1">
                          YoY Growth Range
                        </h4>
                        <div className="text-xl font-bold text-orange-900">
                          18-28%
                        </div>
                        <div className="text-xs text-orange-700">
                          Annual growth variation
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-red-900 mb-1">
                          Lower Bound Volume
                        </h4>
                        <div className="text-2xl font-bold text-red-900">
                          $291.4M
                        </div>
                        <div className="text-xs text-red-700">
                          Conservative estimate by 2028
                        </div>
                        <div className="text-xs text-red-600 mt-1">
                          -15% from point forecast
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-blue-900 mb-1">
                          Point Forecast
                        </h4>
                        <div className="text-2xl font-bold text-blue-900">
                          $342.8M
                        </div>
                        <div className="text-xs text-blue-700">
                          Expected volume by 2028
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          Base case scenario
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-green-900 mb-1">
                          Upper Bound Volume
                        </h4>
                        <div className="text-2xl font-bold text-green-900">
                          $394.2M
                        </div>
                        <div className="text-xs text-green-700">
                          Optimistic estimate by 2028
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          +15% from point forecast
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Manufacturer's Opportunity Simulation */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                      Manufacturer's Opportunity Simulation
                    </h3>

                    <div className="flex items-center justify-center mb-8">
                      <div className="relative">
                        <div className="w-48 h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  {
                                    name: "Opportunity",
                                    value: 101,
                                    color: "#10B981",
                                  },
                                  {
                                    name: "Remaining",
                                    value: 241,
                                    color: "#E5E7EB",
                                  },
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={90}
                                startAngle={90}
                                endAngle={450}
                                dataKey="value"
                              >
                                <Cell fill="#10B981" />
                                <Cell fill="#E5E7EB" />
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-3xl font-bold text-gray-900">
                            101M
                          </div>
                          <div className="text-sm text-gray-600">
                            Expression's total potential
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            Manufacturer's forecasted opportunity at current
                            Expression's share
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-blue-200 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            Opportunity at manufacturer's fair share of 30%
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-4">
                          Current sales share for manufacturer in expression
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">101M</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">174M</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">6.2%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
