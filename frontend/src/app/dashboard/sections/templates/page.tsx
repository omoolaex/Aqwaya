"use client";

import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Plus,
  Eye,
  Copy,
  Edit,
  Mail,
  MessageSquare,
  Globe,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function TemplatesPage() {
  const templates = [
    {
      id: 1,
      name: "Welcome Email Template",
      type: "Email",
      category: "Onboarding",
      usage: 45,
      lastUsed: "2024-01-15",
      icon: Mail,
      color: "from-green-500 to-blue-500",
    },
    {
      id: 2,
      name: "Product Launch Landing Page",
      type: "Landing Page",
      category: "Product Launch",
      usage: 23,
      lastUsed: "2024-01-12",
      icon: Globe,
      color: "from-orange-500 to-red-500",
    },
    {
      id: 3,
      name: "Follow-up SMS Sequence",
      type: "SMS",
      category: "Follow-up",
      usage: 67,
      lastUsed: "2024-01-14",
      icon: MessageSquare,
      color: "from-purple-500 to-pink-500",
    },
  ];

  const categories = [
    { name: "All Templates", count: 24 },
    { name: "Email", count: 12 },
    { name: "Landing Pages", count: 8 },
    { name: "SMS/WhatsApp", count: 4 },
  ];

  const stats = [
    {
      label: "Total Templates",
      value: "24",
      change: "+3",
      color: "text-blue-600",
    },
    {
      label: "Most Used",
      value: "Welcome Email",
      change: "67 uses",
      color: "text-green-600",
    },
    { label: "Categories", value: "8", change: "+1", color: "text-purple-600" },
    {
      label: "Avg. Performance",
      value: "12.3%",
      change: "+2.1%",
      color: "text-orange-600",
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
                <FileText className="text-blue-500 w-6 h-6" />
                <h1 className="text-xl md:text-2xl font-bold">Templates</h1>
              </div>
              <p className="text-sm text-gray-500">
                Manage your marketing templates
              </p>
            </div>
          </div>

          {/* Create Button */}
          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded shadow flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Create Template
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow p-6"
            >
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className={`text-sm ${stat.color}`}>{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Categories + Templates */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories */}
          <Card className="bg-white lg:col-span-1 p-6 border border-gray-200">
            <h2 className="font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded"
                >
                  <span className="text-sm">{category.name}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          {/* Templates Grid */}
          <div className="lg:col-span-3">
            <Card className="bg-white p-6 border border-gray-200">
              <h2 className="font-semibold mb-4">Template Library</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className="hover:shadow-lg transition-shadow border border-gray-200"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-10 h-10 bg-gradient-to-r ${template.color} rounded-lg flex items-center justify-center`}
                        >
                          <template.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="font-semibold text-sm mb-1">
                        {template.name}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {template.type}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {template.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Used {template.usage} times</span>
                        <span>Last used: {template.lastUsed}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
