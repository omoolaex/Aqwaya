"use client";

import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Users,
  Mail,
  MessageSquare,
  Globe,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AnalyticsPage() {
  const overallStats = [
    {
      label: "Total Revenue",
      value: "$17,146",
      change: "+18.7%",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      label: "Total Leads",
      value: "2,693",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Avg. Conversion",
      value: "15.0%",
      change: "+3.2%",
      icon: BarChart3,
      color: "text-purple-600",
    },
    {
      label: "ROI",
      value: "285%",
      change: "+45%",
      icon: TrendingUp,
      color: "text-emerald-600",
    },
  ];

  const channelStats = [
    {
      channel: "Email Marketing",
      leads: 1234,
      conversion: "12.3%",
      revenue: "$8,456",
      icon: Mail,
      bgColor: "from-green-500 to-emerald-500",
    },
    {
      channel: "Landing Pages",
      leads: 892,
      conversion: "8.7%",
      revenue: "$5,234",
      icon: Globe,
      bgColor: "from-orange-500 to-red-500",
    },
    {
      channel: "SMS/WhatsApp",
      leads: 567,
      conversion: "24.1%",
      revenue: "$3,456",
      icon: MessageSquare,
      bgColor: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          {/* Left: Back + Title */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
            <Link
              href="/dashboard"
              className="text-sm flex items-center gap-2 bg-white rounded hover:bg-gray-100 border border-gray-200 px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="text-blue-500 w-6 h-6" />
                <h1 className="text-xl md:text-2xl font-bold">Analytics</h1>
              </div>
              <p className="text-sm text-gray-500">
                Track your marketing performance
              </p>
            </div>
          </div>

          {/* Export Button */}
          <div className="w-full md:w-auto">
            <Button className="w-full md:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded shadow text-center">
              Export Report
            </Button>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          {overallStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow p-6 flex items-center justify-between"
            >
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                <div className={`text-sm ${stat.color}`}>{stat.change}</div>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          ))}
        </div>

        {/* Channel Performance */}
        <Card className="p-6 mb-6 border border-gray-200">
          <h2 className="font-semibold mb-4">Channel Performance</h2>
          <div className="space-y-4">
            {channelStats.map((channel, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${channel.bgColor} rounded-lg flex items-center justify-center`}
                  >
                    <channel.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{channel.channel}</h3>
                    <p className="text-sm text-gray-600">Marketing Channel</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-lg">{channel.leads}</p>
                    <p className="text-gray-600">Leads</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg">
                      {channel.conversion}
                    </p>
                    <p className="text-gray-600">Conversion</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg">{channel.revenue}</p>
                    <p className="text-gray-600">Revenue</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Chart */}
        <Card className="p-6 border border-gray-200">
          <h2 className="font-semibold mb-4">Performance Trends</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">
                Performance chart will be displayed here
              </p>
              <p className="text-sm text-gray-500">
                Connect your analytics tools to view detailed charts
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
