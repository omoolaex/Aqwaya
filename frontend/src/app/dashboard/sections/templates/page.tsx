"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  Copy,
  Pencil,
  FileText,
  MessageSquare,
  Mail,
  Globe,
} from "lucide-react";
import Sidebar from "../../components/Sidebar";

export default function TemplatesPage() {
  const stats = [
    {
      title: "Total Templates",
      value: "24",
      change: "+3",
      color: "text-blue-500",
    },
    {
      title: "Welcome Email",
      value: "Most Used",
      sub: "67 uses",
      color: "text-green-500",
    },
    { title: "Categories", value: "8", change: "+1", color: "text-purple-500" },
    {
      title: "Avg. Performance",
      value: "12.3%",
      change: "+2.1%",
      color: "text-orange-500",
    },
  ];

  const categories = [
    { name: "All Templates", count: 24 },
    { name: "Email", count: 12 },
    { name: "Landing Pages", count: 8 },
    { name: "SMS/WhatsApp", count: 4 },
  ];

  const templates = [
    {
      title: "Welcome Email Template",
      type: "Email",
      tags: ["Email", "Onboarding"],
      iconBg: "bg-green-500",
      icon: Mail,
      used: 45,
      lastUsed: "2024-01-15",
    },
    {
      title: "Product Launch Landing Page",
      type: "Landing Page",
      tags: ["Landing Page", "Product Launch"],
      iconBg: "bg-orange-500",
      icon: Globe,
      used: 23,
      lastUsed: "2024-01-12",
    },
    {
      title: "Follow-up SMS Sequence",
      type: "SMS",
      tags: ["SMS", "Follow-up"],
      iconBg: "bg-purple-500",
      icon: MessageSquare,
      used: 67,
      lastUsed: "2024-01-14",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar already handled */}
      <Sidebar />
      <main className="flex-1 p-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          {/* Left section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
            {/* Back link */}
            <div>
              <Link
                href="/dashboard"
                className="text-sm flex items-center gap-2 bg-white rounded hover:bg-gray-100 border border-gray-200 px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Link>
            </div>

            {/* Title + subtitle */}
            <div>
              <div className="flex items-center gap-2">
                <FileText className="text-blue-500" />
                <h1 className="text-xl md:text-2xl font-bold">Templates</h1>
              </div>
              <p className="text-sm text-gray-500">
                Automate your marketing workflows
              </p>
            </div>
          </div>

          {/* Right section (button) */}
          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded shadow text-center">
              + Create Automation
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded shadow border border-gray-200"
            >
              <div className="mt-1 text-xl font-semibold">{stat.value}</div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              {stat.sub ? (
                <p className="text-sm text-green-600">{stat.sub}</p>
              ) : (
                <p className={`${stat.color} text-sm `}>{stat.change}</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-[250px_1fr] gap-6">
          {/* Categories */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li
                  key={cat.name}
                  className="flex justify-between items-center hover:bg-gray-100 px-3 py-2 rounded text-sm text-gray-700 cursor-pointer"
                >
                  <span>{cat.name}</span>
                  <span className="bg-gray-100 text-xs text-gray-600 px-2 py-0.5 rounded">
                    {cat.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Template Library */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-4">Template Library</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((tpl) => (
                <div
                  key={tpl.title}
                  className="flex flex-col justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div
                      className={`${tpl.iconBg} text-white w-10 h-10 flex items-center justify-center text-xl rounded-lg`}
                    >
                      <tpl.icon />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{tpl.title}</p>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        {tpl.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>Used {tpl.used} times</span>
                    <span>Last used: {tpl.lastUsed}</span>
                  </div>

                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      className="p-2 rounded hover:bg-gray-100"
                      title="View"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      className="p-2 rounded hover:bg-gray-100"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      className="p-2 rounded hover:bg-gray-100"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
